import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserProgressContext } from "../store/UserProgressContext";

export default function ProtectedRoute({ children, user, requiredRole }) {
  const { isAuthReady } = useContext(UserProgressContext);

  console.log(user);

  if (!isAuthReady) {
    return <p className="center">Checking authentication...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
