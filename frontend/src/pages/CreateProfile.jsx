import React, { useState } from 'react';
import axios from 'axios';

const CreateProfile = () => {
  const [form, setForm] = useState({
    name: '',
    email: localStorage.getItem("userEmail") || '',
    phone: '',
    address: '',
    role: 'User',
    serviceOffered: '',
    photo: null,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setForm({ ...form, photo: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) {
      if (form[key]) formData.append(key, form[key]);
    }

    try {
      const res = await axios.post('http://localhost:8080/api/profiles', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(res.data);
      setMessage('✅ Profile created successfully!');
    } catch (err) {
      console.error('❌ Error creating profile:', err);
      setMessage(err.response?.data || 'Server error');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Create Profile</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required style={styles.input} />

        <input
          type="email"
          name="email"
          value={form.email}
          readOnly
          style={{ ...styles.input, backgroundColor: '#eee', color: '#333' }}
        />

        <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} required style={styles.input} />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} required style={styles.input} />

        <select name="role" value={form.role} onChange={handleChange} required style={styles.input}>
          <option value="User">User</option>
          <option value="Provider">Provider</option>
        </select>

        {form.role === 'Provider' && (
          <input
            type="text"
            name="serviceOffered"
            placeholder="Service Offered"
            onChange={handleChange}
            required
            style={styles.input}
          />
        )}

        <input type="file" name="photo" accept="image/*" onChange={handleChange} style={styles.input} />

        <button type="submit" style={styles.button}>Create</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial',
  },
  form: { display: 'flex', flexDirection: 'column' },
  input: { marginBottom: '15px', padding: '10px', fontSize: '16px' },
  button: {
    padding: '10px',
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default CreateProfile;
