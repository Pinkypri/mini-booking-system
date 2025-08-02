// components/ProtectedRoute.tsx
import React from 'react';
import AccessDeniedPage from '../../pages/AccessDeniedPage';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
  customAccessDeniedMessage?: string;
  onLoginRedirect?: () => void;
  onHomeRedirect?: () => void;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredPermissions,
  customAccessDeniedMessage,
  onLoginRedirect,
  onHomeRedirect
}) => {
  const token = localStorage.getItem('token');
  const userPermissions = JSON.parse(localStorage.getItem('userPermissions') || '[]');

  // Check if user is authenticated
  if (!token) {
    return (
      <AccessDeniedPage
        title="Authentication Required"
        message={customAccessDeniedMessage || "Please log in to access this page. Your session may have expired."}
        showLoginButton={true}
        showHomeButton={true}
        onLoginClick={onLoginRedirect}
        onHomeClick={onHomeRedirect}
      />
    );
  }

  // Check if user has required permissions (if specified)
  if (requiredPermissions && requiredPermissions.length > 0) {
    const hasPermission = requiredPermissions.some(permission => 
      userPermissions.includes(permission)
    );

    if (!hasPermission) {
      return (
        <AccessDeniedPage
          title="Insufficient Permissions"
          message="You don't have the necessary permissions to access this page. Please contact your administrator."
          showLoginButton={false}
          showHomeButton={true}
          onHomeClick={onHomeRedirect}
        />
      );
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;