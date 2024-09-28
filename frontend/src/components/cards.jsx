import React, { useEffect, useState } from 'react';
import Card from './card';
import axios from 'axios';
import '../entries.css';  // Add a separate CSS file for styling

const Entries = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3001/api/entry/get?time=Morning  ', 
          {
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          }
        );
        console.log(response.data)
        setEntries(response.data);
      } catch (err) {
        setError('Failed to fetch entries. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchEntries();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="city-grid">
      {entries.map((entry) => (
        <Card key={entry._id} entry={entry} />
      ))}
    </div>
  );
};

export default Entries;
