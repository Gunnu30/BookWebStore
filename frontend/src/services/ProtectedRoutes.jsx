import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const { user, role } = useSelector((state) => state.user);
  const location = useLocation();
  
  const isAdminPath = location.pathname.startsWith("/admin");

  // 1. Not Logged In? 
  // Redirect to the specific login page based on the URL context
  if (!user) {
    return <Navigate to={isAdminPath ? "/admin/login" : "/login"} replace />;
  }

  // 2. Logged In as Admin? 
  // If they are on a standard user path (like /profile), maybe allow it, 
  // or force them to their dashboard.
  if (role === 'admin' && !isAdminPath) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // 3. Logged In as User? 
  // If they try to access /admin/... but are just a regular user
  if (role !== 'admin' && isAdminPath) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;