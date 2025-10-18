import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserProgressContext } from "../store/UserProgressContext";

export default function ProtectedRoute({ children, user }) {
  const { isAuthReady } = useContext(UserProgressContext);

  if (!isAuthReady) {
    return <p>Checking authentication...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
