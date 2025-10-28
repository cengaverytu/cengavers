// router.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import HomePage from "./routes/HomePage";
import DashboardPage from "./routes/DashboardPage";
import AdminPanel from "./routes/AdminPanel";
import Layout from "../components/layout/Layout";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import AdminRoute from "../features/auth/components/AdminRoute";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* public */}
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* login gerekli */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* sadece admin */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
