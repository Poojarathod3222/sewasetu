import React from 'react';
import { useNavigate } from 'react-router-dom';
import plumberImg from '../assets/images/plumber.jpg';
import electricianImg from '../assets/images/electrician.jpg';
import carpenterImg from '../assets/images/cleaning.jpg';
import carRepairImg from '../assets/images/carRepair.jpg';

const Home = () => {
  const navigate = useNavigate();

  const services = [
    { title: 'Plumber', description: 'Fix leaks and install pipes.', image: plumberImg },
    { title: 'Electrician', description: 'Safe and fast electrical repairs.', image: electricianImg },
    { title: 'Carpenter', description: 'Woodwork and furniture fixes.', image: carpenterImg },
    { title: 'Car Repair', description: 'Mechanical and engine servicing.', image: carRepairImg },
  ];

  const handleBookNow = (serviceName) => {
    navigate(`/search?service=${encodeURIComponent(serviceName)}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Available Services</h1>
      <div style={styles.grid}>
        {services.map((service, idx) => (
          <div key={idx} style={styles.card}>
            <img src={service.image} alt={service.title} style={styles.image} />
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <button style={styles.button} onClick={() => handleBookNow(service.title)}>
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '2rem',
    color: '#333',
  },
  grid: {
    display: 'grid',
    gap: '2rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    borderRadius: '8px 8px 0 0',
  },
  button: {
    marginTop: '1rem',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Home;
