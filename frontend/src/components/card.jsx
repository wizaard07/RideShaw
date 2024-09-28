import React from 'react';
import '../card.css';

const Card = ({ entry }) => {
  return (
    <div className="card">
      <h3>{entry.city_name}</h3>
      <p>{entry.description}</p>
      <p><strong>Time:</strong> {entry.time}</p>
      <p>Number of people: {entry.count}</p>
      <button className="request-to-join-button">
        Request to Join
      </button>
    </div>
  );
};

export default Card;
