import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProviderRequests = () => {
  const [bookings, setBookings] = useState([]);
  const email = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/bookings/provider/${email}`);
        setBookings(res.data);
      } catch (err) {
        console.error('Error loading provider bookings:', err);
      }
    };
    fetchBookings();
  }, [email]);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:8080/api/bookings/update-status/${id}?status=${status}`);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    } catch (err) {
      console.error('Status update failed:', err);
      alert('Failed to update status');
    }
  };

  const tableCell = {
    padding: '10px',
    borderBottom: '1px solid #ccc',
    textAlign: 'center',
  };

  return (
    <div>
      <h3 style={{ marginBottom: '20px' }}>Your Booking Requests</h3>
      {bookings.length === 0 ? (
        <p>No booking requests yet.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={tableCell}>Customer</th>
              <th style={tableCell}>Service</th>
              <th style={tableCell}>Date</th>
              <th style={tableCell}>Status</th>
              <th style={tableCell}>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td style={tableCell}>{b.name}</td>
                <td style={tableCell}>{b.providerService}</td>
                <td style={tableCell}>{new Date(b.bookingDate).toLocaleString()}</td>
                <td style={tableCell}>{b.status}</td>
                <td style={tableCell}>
                  {b.status === 'Pending' && (
                    <>
                      <button
                        style={{ marginRight: '8px', backgroundColor: '#28a745', color: '#fff', padding: '6px 12px', border: 'none', borderRadius: '5px' }}
                        onClick={() => updateStatus(b.id, 'Accepted')}
                      >
                        Accept
                      </button>
                      <button
                        style={{ backgroundColor: '#dc3545', color: '#fff', padding: '6px 12px', border: 'none', borderRadius: '5px' }}
                        onClick={() => updateStatus(b.id, 'Rejected')}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProviderRequests;
