import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./routes/HomePage";
import LoginPage from "./routes/LoginPage";
import RegisterPage from "./routes/RegisterPage";
import DashboardPage from "./routes/DashboardPage";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import AdminRoute from "../features/auth/components/AdminRoute";
import AdminPanel from "./routes/AdminPanel";
import AdminUsersPage from "./routes/AdminUsersPage";
import Layout from "../components/layout/Layout";
import MessagePage from "./routes/MessagePage";               

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
      <Route index element={<HomePage />} />

        <Route element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/messages" element={<MessagePage />} />
          </Route>
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
