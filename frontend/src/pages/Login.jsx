import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
  const res = await axios.post('http://localhost:8080/api/auth/login', formData);

  if (res.data === 'Login Successful' || res.status === 200) {
    localStorage.setItem('userEmail', formData.email);

    try {
      const profileRes = await axios.get(`http://localhost:8080/api/profiles/by-email/${formData.email}`);
      const profile = profileRes.data;

      if (profile?.id) {
        localStorage.setItem('profileId', profile.id);
        localStorage.setItem('userRole', profile.role);

        if (profile.role === 'Provider') {
          navigate('/provider-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      }
    } catch (profileErr) {
      if (profileErr.response?.status === 404) {
        // No profile, redirect to form
        navigate('/create-profile');
      } else {
        console.error('Profile fetch error:', profileErr);
        setMessage('Error loading profile.');
      }
    }
  } else {
    setMessage('Invalid credentials.');
  }
} catch (err) {
  console.error('Login failed:', err);
  setMessage('Login failed. Try again.');
}
  };

  // 💅 Styles
  const containerStyle = {
    width: '350px',
    margin: '50px auto',
    padding: '25px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial',
    textAlign: 'center',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          style={inputStyle}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button style={buttonStyle} type="submit">Login</button>
      </form>
      {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}
    </div>
  );
};

export default Login;
