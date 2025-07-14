import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
     role: 'User',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/auth/register', formData);
      setMessage('Registration successful!');
    } catch (err) {
      console.error(err);
      setMessage('Registration failed.');
    }
  };

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
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input style={inputStyle} type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input style={inputStyle} type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input style={inputStyle} type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button style={buttonStyle} type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
