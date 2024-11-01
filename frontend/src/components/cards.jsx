import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from './card';
import '../entries.css';  // Add a separate CSS file for styling

const Entries = ({ user }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  const [cityName, setCityName] = useState(''); // State for selected city
  const [time, setTime] = useState(''); // State for selected time

  // Sample data for city and time options
  const cityOptions = ['Vadtal', 'Ahmedabad', 'Surat', 'Mumbai'];
  const timeOptions = ['Morning', 'Afternoon', 'Evening', 'Night'];

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        let url = "http://localhost:3001/api/entry/get";
        const queryParams = [];

        if (cityName) queryParams.push(`city_name=${cityName}`);
        if (time) queryParams.push(`time=${time}`);
        
        if (user) {
          console.log("Fetching user-specific entries");
          url = "http://localhost:3001/api/user/entry"; // User-specific entries URL
        } else {
          console.log("Fetching all entries");
          // Default fetching with city and time filtering if user is not present
        }

        if (queryParams.length) {
          url += `?${queryParams.join('&')}`;
        }

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const res = await response.json();
        console.log("Fetched entries:", res);
        setEntries(res);
      } catch (err) {
        console.error("Error fetching entries:", err);
        setError('Failed to fetch entries. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, [user, cityName, time]); // Depend on user, cityName, and time

  useEffect(() => {
    console.log("entries:", entries); 
  }, [entries]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="entries-container">
      <div className="filter-section">
        <select value={cityName} onChange={(e) => setCityName(e.target.value)}>
          <option value="">Select City</option>
          {cityOptions.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <select value={time} onChange={(e) => setTime(e.target.value)}>
          <option value="">Select Time</option>
          {timeOptions.map((timeOption) => (
            <option key={timeOption} value={timeOption}>{timeOption}</option>
          ))}
        </select>
      </div>

      <div className="city-grid">
        {entries.map((entry) => (
          <Card key={entry._id} entry={entry} userID={user ? user._id : null} />
        ))}
      </div>
    </div>
  );
};

// Optional: PropTypes validation
Entries.propTypes = {
  user: PropTypes.object,
};

export default Entries;
