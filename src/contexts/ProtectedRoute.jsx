import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ requireAuth }) => {
  const { user } = useAuth();

  if (requireAuth && !user) {
    return <Navigate to="/login" />; // Redirect ke halaman login jika belum login
  }

  if (!requireAuth && user) {
    return <Navigate to="/" />; // Redirect ke halaman utama jika sudah login
  }

  return <Outlet />;
};

export default ProtectedRoute;