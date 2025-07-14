// src/components/Requests.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Requests = () => {
  const [bookings, setBookings] = useState([]);
  
  const email = localStorage.getItem("userEmail");

useEffect(() => {
  const email = localStorage.getItem("userEmail");
  console.log("Fetching user bookings for:", email);
  axios.get(`http://localhost:8080/api/bookings/user/${email}`)
    .then(res => {
      console.log("User bookings:", res.data);
      setBookings(res.data);
    })
    .catch(console.error);
}, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Your Booking Requests</h2>
      {bookings.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No bookings found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={thStyle}>Service</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} style={{ textAlign: 'center' }}>
                <td style={tdStyle}>{b.providerService}</td>
                <td style={tdStyle}>{new Date(b.bookingDate).toLocaleString()}</td>
                <td style={tdStyle}>{b.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const thStyle = { padding: '10px', borderBottom: '2px solid #ccc' };
const tdStyle = { padding: '10px', borderBottom: '1px solid #eee' };

export default Requests;
