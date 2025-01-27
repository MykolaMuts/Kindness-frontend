import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  allowedRoles: ('USER' | 'ADMIN')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { isAuthenticated, userRoles } = useAuth();

  const hasAccess = allowedRoles.some(role => userRoles.includes(role));

  if (!isAuthenticated || !hasAccess) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;