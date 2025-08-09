import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "./UserContext";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user } = useUser();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
