import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const BookService = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const provider = location.state?.provider;

  if (!provider) {
    return <p style={{ color: 'red' }}>Error: No provider information found.</p>;
  }

  const [formData, setFormData] = useState({
    name: '',
    userEmail: localStorage.getItem('userEmail') || '',
    phone: '',
    address: '',
    providerService: provider.serviceOffered || '',  // ✅ Added here
    providerEmail: provider.email || '',
    bookingDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting booking:", formData);

    try {
      await axios.post('http://localhost:8080/api/bookings', formData);
      alert('Booking successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Booking failed:', error.response?.data || error.message);
      alert('Booking failed. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Book Service: {provider.serviceOffered}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="email"
          name="userEmail"
          value={formData.userEmail}
          readOnly
          style={{ ...styles.input, backgroundColor: '#f2f2f2' }}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="providerService"
          value={formData.providerService}
          readOnly
          style={{ ...styles.input, backgroundColor: '#f2f2f2' }}
        />

        <input
          type="text"
          name="providerEmail"
          value={formData.providerEmail}
          readOnly
          style={{ ...styles.input, backgroundColor: '#f2f2f2' }}
        />

        <input
          type="datetime-local"
          name="bookingDate"
          value={formData.bookingDate}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Confirm Booking</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '500px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '15px',
    padding: '10px 14px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '6px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default BookService;
