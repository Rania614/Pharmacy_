import { Navigate } from 'react-router-dom';
import useAuthStore from '../stores/authStore';

function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, isAdmin } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/profile" replace />;
  }

  return children;
}

export default ProtectedRoute;
