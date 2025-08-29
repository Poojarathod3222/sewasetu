import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const userEmail = localStorage.getItem('userEmail');
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', address: '', role: '', serviceOffered: '', photo: null
  });

  useEffect(() => {
    if (userEmail) {
      axios.get(`http://localhost:8080/api/profiles/by-email/${userEmail}`)
        .then(res => {
          setProfile(res.data);
          setForm(res.data);
        })
        .catch(err => console.error('Profile not found', err));
    }
  }, [userEmail]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleUpdate = async () => {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("address", form.address);
    formData.append("role", form.role);
    if (form.role === "Provider") {
      formData.append("serviceOffered", form.serviceOffered || '');
    }
    if (form.photo instanceof File) {
      formData.append("photo", form.photo);
    }

    try {
      const res = await axios.post(`http://localhost:8080/api/profiles/update/${profile.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setProfile(res.data);
      setForm(res.data);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      alert("Update failed.");
    }
  };

  if (!profile) return <p style={styles.loading}>Loading...</p>;

  const photoURL = profile.photoPath ? `http://localhost:8080/uploads/${profile.photoPath}` : null;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Profile</h2>

      {!editMode ? (
        <div style={styles.card}>
          <div style={styles.cardContent}>
            {photoURL && <img src={photoURL} alt="Profile" style={styles.image} />}
            <div style={styles.details}>
              <p><strong>Name:</strong> {profile.name}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Phone:</strong> {profile.phone}</p>
              <p><strong>Address:</strong> {profile.address}</p>
              <p><strong>Role:</strong> {profile.role}</p>
              {profile.role === 'Provider' && (
                <p><strong>Service Offered:</strong> {profile.serviceOffered}</p>
              )}
              <button style={styles.button} onClick={() => setEditMode(true)}>Edit Profile</button>
            </div>
          </div>
        </div>
      ) : (
        <div style={styles.formCard}>
          {photoURL && <img src={photoURL} alt="Current Profile" style={styles.image} />}
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" style={styles.input} />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" style={styles.input} />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" style={styles.input} />
          <input name="address" value={form.address} onChange={handleChange} placeholder="Address" style={styles.input} />
          <select name="role" value={form.role} onChange={handleChange} style={styles.input}>
            <option value="">Select Role</option>
            <option value="User">User</option>
            <option value="Provider">Provider</option>
          </select>
          {form.role === "Provider" && (
            <input name="serviceOffered" value={form.serviceOffered || ''} onChange={handleChange} placeholder="Service Offered" style={styles.input} />
          )}
          <input type="file" name="photo" onChange={handleChange} style={styles.input} />
          <div style={styles.buttonGroup}>
            <button onClick={handleUpdate} style={styles.saveBtn}>Save</button>
            <button onClick={() => setEditMode(false)} style={styles.cancelBtn}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

// 👇 Inline Styles
const styles = {
  container: {
    padding: '30px',
    maxWidth: '800px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  card: {
    background: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px #ccc',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: '20px',
  },
  details: {
    flex: 1,
  },
  formCard: {
    background: '#f0f8ff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px #aaa',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  button: {
    backgroundColor: '#007BFF',
    color: 'white',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '15px',
  },
  saveBtn: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    flex: 1,
    marginRight: '5px',
  },
  cancelBtn: {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    flex: 1,
    marginLeft: '5px',
  },
  image: {
    width: '140px',
    height: 'auto',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  loading: {
    textAlign: 'center',
    marginTop: '50px',
    fontSize: '18px',
  }
};

export default Profile;
