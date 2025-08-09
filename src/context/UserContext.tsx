import { createContext, useContext, useState, useEffect } from "react";
import type { User } from "@/types/items";

type UserContextType = {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(() => {
    const stored = sessionStorage.getItem("user");
    return stored ? (JSON.parse(stored) as User) : undefined;
  });

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
};
