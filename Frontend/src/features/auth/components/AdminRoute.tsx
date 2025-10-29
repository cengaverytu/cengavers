// AdminRoute.tsx
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuth";

export default function AdminRoute() {
  const { data: me, isLoading } = useAuthUser();
  const loc = useLocation();

  if (isLoading) return null;
  if (!me) return <Navigate to="/login" state={{ from: loc }} replace />;
  if (Number(me.roleId) !== 2) return <Navigate to="/" replace />;

  return <Outlet />;
}
