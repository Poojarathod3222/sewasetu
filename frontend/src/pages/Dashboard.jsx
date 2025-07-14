// src/pages/Dashboard.js
import React from 'react';
import UserDashboard from './UserDashboard';
import ProviderDashboard from './ProviderDashboard';

const Dashboard = () => {
  const role = localStorage.getItem('userRole')?.toLowerCase();

  return role === 'provider' ? <ProviderDashboard /> : <UserDashboard />;
};

export default Dashboard;
