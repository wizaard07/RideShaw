import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from './card';
import '../entries.css';  // Add a separate CSS file for styling

const Entries = ({ user }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        if (user) {
          console.log("Fetching user-specific entries");
          const response = await fetch("http://localhost:3001/api/user/entry", {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });

          const res = await response.json()
          console.log("User data:", res.entry);
          setEntries(res.entry);
        } 
        
        else {
          console.log("Fetching all entries");
          const response = await fetch(`http://localhost:3001/api/entry/get?time=Morning`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });

          const res = await response.json()
          console.log("All data:", res);
          setEntries(res);
        }
      } catch (err) {
        console.error("Error fetching entries:", err);
        setError('Failed to fetch entries. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [user]); // Depend on `user`

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

// Optional: PropTypes validation
Entries.propTypes = {
  user: PropTypes.object,
};

export default Entries;
