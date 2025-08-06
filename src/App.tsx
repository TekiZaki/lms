import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./pages/DashboardPage";
import UsersPage from "./pages/UsersPage";
import ClassesPage from "./pages/ClassesPage";
import AccountPage from "./pages/AccountPage";
import NotFoundPage from "./pages/NotFoundPage";
import type { Id } from "../convex/_generated/dataModel";

// A simple protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">Memuat...</div>
    );
  }

  if (!user) return null; // Or a loading spinner, navigation is happening

  return <>{children}</>;
};

// Role-based access control wrapper
const RoleBasedRoute = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) => {
  const { user } = useAuth();
  if (!user || !allowedRoles.includes(user.role)) {
    return <NotFoundPage />; // Or a dedicated "Access Denied" page
  }
  return <>{children}</>;
};

function App() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If user is logged in and tries to access /login, redirect to dashboard
    if (user && location.pathname === "/login") {
      navigate("/dashboard");
    }
  }, [user, location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="account" element={<AccountPage />} />

        {/* Admin Routes */}
        <Route
          path="users"
          element={
            <RoleBasedRoute allowedRoles={["admin"]}>
              <UsersPage />
            </RoleBasedRoute>
          }
        />
        <Route
          path="classes"
          element={
            <RoleBasedRoute allowedRoles={["admin"]}>
              <ClassesPage />
            </RoleBasedRoute>
          }
        />

        {/* Placeholder routes for other features */}
        <Route path="tasks" element={<h1 className="p-6">Halaman Tugas</h1>} />
        <Route path="grades" element={<h1 className="p-6">Halaman Nilai</h1>} />
        <Route
          path="students"
          element={<h1 className="p-6">Halaman Siswa</h1>}
        />
        <Route path="forum" element={<h1 className="p-6">Halaman Forum</h1>} />

        {/* Redirect base path to dashboard */}
        <Route index element={<DashboardPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
