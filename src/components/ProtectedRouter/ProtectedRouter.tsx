import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {useAuth} from "../../hooks/useAuth.tsx";
import {SelectedPages} from "../../App.constants.tsx";

interface ProtectedRouteProps {
  requiredRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRoles }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={SelectedPages.Login} />;
  }

  if (requiredRoles && !requiredRoles.some(role => user?.role.includes(role))) {
    return <Navigate to={SelectedPages.Unauthorized} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;