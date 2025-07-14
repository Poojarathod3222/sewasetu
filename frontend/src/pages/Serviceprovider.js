import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ServiceProvider = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const initialService = queryParams.get('service') || '';

  const [city, setCity] = useState('');
  const [service, setService] = useState(initialService);
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/profiles/search', {
        params: { city, service }
      });
      setResults(res.data);
    } catch (error) {
      console.error('Error fetching providers:', error);
    }
  };

  useEffect(() => {
    if (initialService) {
      handleSearch();
    }
  }, [initialService]);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Find Service Providers</h2>
      <input
        type="text"
        placeholder="Enter City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Service (optional)"
        value={service}
        onChange={(e) => setService(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {results.map((provider) => (
        <div key={provider.id} style={{ border: '1px solid #ccc', marginTop: '10px', padding: '10px' }}>
          <h3>{provider.name}</h3>
          <p><strong>Service:</strong> {provider.serviceOffered}</p>
          <p><strong>City:</strong> {provider.address}</p>
          <button onClick={() => navigate(`/book/${provider.id}`)}>Book Now</button>
        </div>
      ))}
    </div>
  );
};

export default ServiceProvider;
