// src/features/auth/components/AdminRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuthUser } from "../hooks/useAuth";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { data: me, isLoading } = useAuthUser();
  const loc = useLocation();

  if (isLoading) return null;                // yüklenirken bekle
  if (!me) return <Navigate to="/login" state={{ from: loc }} replace />; // login değil
  if (Number(me.roleId) !== 2) return <Navigate to="/" replace />;        // admin değil

  return <>{children}</>;
}
