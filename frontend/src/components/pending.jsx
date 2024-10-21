import React, { useState } from 'react';
import '../UserRequestPage.css';

// Define the UserRequestPage component


const UserRequestPage = () => {

  // Sample user request data
  const [requests, setRequests] = useState([
    { id: 1, name: 'John Doe', profilePic: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Jane Smith', profilePic: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Alex Johnson', profilePic: 'https://via.placeholder.com/150' }
  ]);

  // Handle accept request
  const handleAccept = (id) => {
    console.log(`Accepted request for user with ID: ${id}`);
    // Remove request from the list
    setRequests(requests.filter((request) => request.id !== id));
  };

  // Handle decline request
  const handleDecline = (id) => {
    console.log(`Declined request for user with ID: ${id}`);
    // Remove request from the list
    setRequests(requests.filter((request) => request.id !== id));
  };

  return (
    <div className="profile-container1">
      <div className="entries-list1">
        <h2>Pending User Requests</h2>
        {requests.length === 0 ? (
          <p>No pending requests</p>
        ) : (
          requests.map((request) => (
            <div key={request.id} className="request-entry">
              {/* <img src={request.profilePic} alt={request.name} className="profile-pic" /> */}
              <div className="request-details">
                <h3>{request.name}</h3>
                <button onClick={() => handleAccept(request.id)}>Accept</button>
                <button onClick={() => handleDecline(request.id)}>Decline</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserRequestPage;
