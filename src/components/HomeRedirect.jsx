import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";

export default function HomeRedirect() {
  const { user, profile, loading } = useAuth();

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" replace />;
  if (profile?.role === "admin") return <Navigate to="/admin" replace />;
  if (profile?.role === "member") return <Navigate to="/member" replace />;

  return <Navigate to="/unauthorized" replace />;
}
