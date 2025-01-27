import React from 'react';
import Dashboard from './user/dashboard';
import ProtectedRoute from '@/middleware/protectedroute';

function index() {
  return (
    <>
      <Dashboard />
    </>
  );
}

export default ProtectedRoute(index);
