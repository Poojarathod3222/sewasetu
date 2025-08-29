import React, { useState } from 'react';
import BookingForm from './BookingForm';

const ServiceCard = ({ image, title, description, id }) => {
  const [showBooking, setShowBooking] = useState(false);

  const styles = {
    card: {
      border: '1px solid #ccc',
      padding: '20px',
      borderRadius: '8px',
      width: '250px',
      margin: '20px',
      textAlign: 'center',
    },
    image: {
      width: '100%',
      height: '150px',
      objectFit: 'cover',
      borderRadius: '5px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '10px',
    },
  };

  return (
    <div style={styles.card}>
      <img src={image} alt={title} style={styles.image} />
      <h3>{title}</h3>
      <p>{description}</p>
<button onClick={() => navigate(`/book/${provider.id}`, { state: { provider } })}>
  Book Now
</button>

      {showBooking && (
        <BookingForm serviceId={id} onClose={() => setShowBooking(false)} />
      )}
    </div>
  );
};

export default ServiceCard;