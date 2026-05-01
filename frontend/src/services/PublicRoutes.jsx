import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoutes = () => {
    const { user, role } = useSelector((state) => state.user);
    const location = useLocation();

    if (user) {
        // If logged in, redirect based on their authority
        if (role === 'admin') {
            return <Navigate to="/admin/dashboard" replace />;
        }
        return <Navigate to="/" replace />;
    }

    // If NOT logged in, show the login/register page they asked for
    return <Outlet />;
};

export default PublicRoutes;