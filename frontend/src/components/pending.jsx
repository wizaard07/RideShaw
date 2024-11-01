import React, { useEffect, useState } from 'react';
import '../UserRequestPage.css';

const UserRequestPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/entry/req/pendings", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const arr = await response.json();
        const req = arr.map((e, index) => ({
          id: index + 1,
          name: e.username,
          _id: e._id,
          contact: e.contact,
        }));

        setRequests(req);
      } catch (error) {
        console.error("Error fetching user requests:", error);
      }
    };
    getUsers();
  }, []);

  const handleRequest = (id, grant) => {
    setRequests((prevRequests) => prevRequests.filter((request) => request.id !== id));
    const updateRequestStatus = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/entry/req/verify", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ request: id, grant }),
        });
        const json = await response.json();
        console.log(`User request ${grant ? "accepted" : "declined"} successfully:`, json);
      } catch (error) {
        console.error(`Error ${grant ? "accepting" : "declining"} user request:`, error);
        setRequests((prevRequests) => [...prevRequests, { id }]);
      }
    };
    updateRequestStatus();
  };

  const handleAccept = (id) => handleRequest(id, true);
  const handleDecline = (id) => handleRequest(id, false);

  return (
    <div className="profile-container1">
      <div className="entries-list1">
        <h2>Pending User Requests</h2>
        {requests.length === 0 ? (
          <p>No pending requests</p>
        ) : (
          requests.map((request) => (
            <div key={request.id} className="request-entry">
              <div className="request-details">
                <div className="request-info">
                  <h3>{request.name}</h3>
                  <p>Contact: {request.contact}</p>
                </div>
                <div className="request-actions">
                  <button onClick={() => handleAccept(request._id)}>Accept</button>
                  <button onClick={() => handleDecline(request._id)}>Decline</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserRequestPage;
