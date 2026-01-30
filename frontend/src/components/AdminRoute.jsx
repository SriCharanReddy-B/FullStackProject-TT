import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const isAuthenticated = user !== null;
    const isAdmin = user?.role === 'ADMIN';

    return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default AdminRoute;
