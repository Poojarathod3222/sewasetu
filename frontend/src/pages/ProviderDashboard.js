import React, { useState } from 'react';
import Profile from '../components/profile';
import Services from '../components/service';
import ProviderRequests from './ProviderRequest';

const ProviderDashboard = () => {
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
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        Provider Dashboard
      </h2>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <button style={buttonStyle(active === 'profile')} onClick={() => setActive('profile')}>
          Profile
        </button>
        <button style={buttonStyle(active === 'services')} onClick={() => setActive('services')}>
          Services
        </button>
        <button style={buttonStyle(active === 'requests')} onClick={() => setActive('requests')}>
          Booking Requests
        </button>
      </div>

      <div
        style={{
          backgroundColor: '#fff',
          padding: '25px',
          borderRadius: '10px',
          maxWidth: '900px',
          margin: '0 auto',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        {active === 'profile' && <Profile />}
        {active === 'services' && <Services />}
        {active === 'requests' && <ProviderRequests />}
      </div>
    </div>
  );
};

export default ProviderDashboard;
