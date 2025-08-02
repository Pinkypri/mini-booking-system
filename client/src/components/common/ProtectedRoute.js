// components/ProtectedRoute.js
import React from 'react';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Instead of redirecting, just show a message or custom component
    return <div>Access Denied. Please log in to access this page.</div>;
  }

  return children;
};

export default ProtectedRoute;
