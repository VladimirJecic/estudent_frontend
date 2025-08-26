import { createContext, useContext, useState, useEffect } from "react";
import type { User } from "@/types/items";

type UserContextType = {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  isAuthenticated: boolean;
  isAdmin?: boolean;
  isStudent?: boolean;
  logOut?: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(() => {
    const stored = sessionStorage.getItem("user");
    return stored ? (JSON.parse(stored) as User) : undefined;
  });
  const updateUser = (user: User | undefined) => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
      user.isAdmin = user.role === "admin";
    }
    setUser(user);
  };
  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  const isAuthenticated = undefined !== user;
  const isAdmin = user?.role === "admin";
  const isStudent = user?.role === "student";
  const logOut = () => setUser(undefined);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: updateUser,
        isAuthenticated,
        isAdmin,
        isStudent,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};
