import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { useAuth, Role } from '../context/AuthContext';
import Loader from './Loader';

export default function ProtectedRoute({
  children,
  roles,
}: {
  children: ReactNode;
  roles?: Role[];
}) {
  const { isAuthenticated, hasRole, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !hasRole(...roles)) {
    return <Navigate to={user?.role === 'admin' ? '/admin' : user?.role === 'owner' ? '/owner' : '/renter'} replace />;
  }

  return <>{children}</>;
}

export function RoleRedirect() {
  const { user } = useAuth();
  if (!user) return <Loader full />;
  const dest = user.role === 'admin' ? '/admin' : user.role === 'owner' ? '/owner' : '/renter';
  return <Navigate to={dest} replace />;
}
