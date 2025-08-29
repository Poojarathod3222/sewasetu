import React, { useState } from 'react';
import Profile from '../components/profile';
import Requests from '../components/Request';

const UserDashboard = () => {
  const [active, setActive] = useState('profile');

  const buttonStyle = (isActive) => ({
    padding: '10px 20px',
    margin: '0 10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: isActive ? '#007bff' : '#e0e0e0',
    color: isActive ? '#fff' : '#000',
    cursor: 'pointer',
    fontWeight: 'bold',
  });

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>User Dashboard</h2>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <button style={buttonStyle(active === 'profile')} onClick={() => setActive('profile')}>
          Profile
        </button>
        <button style={buttonStyle(active === 'history')} onClick={() => setActive('history')}>
          Booking History
        </button>
      </div>

      <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        {active === 'profile' && <Profile />}
        {active === 'history' && <Requests />}
      </div>
    </div>
  );
};

export default UserDashboard;
