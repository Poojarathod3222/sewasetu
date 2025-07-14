import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';

// Core Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateProfile from './pages/CreateProfile';
import NotFound from './pages/NotFound';

// Dashboards
import UserDashboard from './pages/UserDashboard';
import ProviderDashboard from './pages/ProviderDashboard';

// Features
import Search from './pages/Search';
import BookService from './pages/Bookservice';
import ServiceProvider from './pages/Serviceprovider';

// Requests
import Requests from './components/Request';
import ProviderRequest from './pages/ProviderRequest';

const App = () => {
  const role = localStorage.getItem('userRole'); // use userRole consistently

  return (
    <>
      <Navbar />
      <Routes>
        {/* Core Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-profile" element={<CreateProfile />} />

        {/* Dashboards */}
        <Route
          path="/dashboard"
          element={
            role === 'Provider' ? (
              <Navigate to="/provider-dashboard" />
            ) : (
              <Navigate to="/user-dashboard" />
            )
          }
        />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/provider-dashboard" element={<ProviderDashboard />} />

        {/* Service and Booking Features */}
        <Route path="/search" element={<Search />} />
        <Route path="/search-providers" element={<ServiceProvider />} />
        <Route path="/book/:id" element={<BookService />} />

        {/* Requests Route */}
        <Route
          path="/requests"
          element={role === 'Provider' ? <ProviderRequest /> : <Requests />}
        />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
