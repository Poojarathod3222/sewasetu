import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('userEmail'); // use the email to check login

  const handleLogout = () => {
    localStorage.clear(); // Clear all data on logout
    navigate('/login');
  };

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#333',
    padding: '15px 25px',
    color: 'white',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 12px',
    fontWeight: 'bold',
  };

  const buttonStyle = {
    ...linkStyle,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1em',
  };

  return (
    <nav style={navStyle}>
      <div>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/search" style={linkStyle}>Search</Link>
        {isLoggedIn && <Link to="/dashboard" style={linkStyle}>Dashboard</Link>}
      </div>
      <div>
        {isLoggedIn ? (
          <button onClick={handleLogout} style={buttonStyle}>Logout</button>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
