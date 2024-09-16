import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.warn("You need to login first to access this page");
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/ims/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
