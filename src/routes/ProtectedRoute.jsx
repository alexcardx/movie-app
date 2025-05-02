import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { user, loading } = useContext(AuthContext);
  return <>{!loading && (user ? <Outlet /> : <Navigate to="/" />)}</>;
};

export default ProtectedRoute;
