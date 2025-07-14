import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [city, setCity] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/profiles/search?city=${city}`);
      setResults(res.data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const handleBook = (provider) => {
    navigate(`/book/${provider.id}`, { state: { provider } });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Search Providers by City</h2>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: '8px', width: '250px', marginRight: '10px' }}
      />
      <button onClick={handleSearch} style={{ padding: '8px 16px' }}>Search</button>

      <div style={{ marginTop: '20px' }}>
        {results.map((provider) => (
          <div
            key={provider.id}
            style={{
              border: '1px solid #ccc',
              padding: '15px',
              marginBottom: '10px',
              borderRadius: '6px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <h4>{provider.name}</h4>
            <p><strong>Service:</strong> {provider.serviceOffered}</p>
            <p><strong>City:</strong> {provider.address}</p>
            <button onClick={() => handleBook(provider)} style={{ padding: '8px 16px' }}>
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
