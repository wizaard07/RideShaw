import React, { useState } from 'react';
import Modal from 'react-modal';
import '../card.css'; // Keep this for any additional card styles

Modal.setAppElement('#root'); // Set the app element for accessibility

const Card = ({ entry, userID }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRequestToJoin = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    alert("We are sharing your contact with the entry creator.");
    setIsModalOpen(false);
  };

  return (
    <div className="card">
      <h3>{entry.city_name}</h3>
      <p>{entry.description}</p>
      <p><strong>Time:</strong> {entry.time}</p>
      <p>Number of people: {entry.count}</p>
      <p>Pending Request: {entry.pending.length}</p>
      {entry.receiver !== userID && (
        <button className="request-to-join-button" onClick={handleRequestToJoin}>
          Request to Join
        </button>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        style={modalStyles}
      >
        <h2 style={modalHeaderStyles}>Contact Sharing</h2>
        <p style={modalTextStyles}>We are sharing your contact with the entry creator. Do you wish to proceed?</p>
        <div style={buttonContainerStyles}>
          <button style={confirmButtonStyles} onClick={handleConfirm}>Yes</button>
          <button style={declineButtonStyles} onClick={handleCloseModal}>No</button>
        </div>
      </Modal>
    </div>
  );
};

// Inline styles for the modal
const modalStyles = {
  content: {
    backgroundColor: '#fff',
    padding: '40px', // Reduced padding for a more compact height
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    width: '400px', // Set a specific width for the modal
    margin: 'auto', // Center the modal
    maxHeight: '250px', // Set a maximum height for the modal
    overflow: 'auto', // Allow scrolling if content exceeds max height
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
};

// Header and text styles for the modal
const modalHeaderStyles = {
  marginBottom: '5px', // Adjust margin for better spacing
  fontSize: '1.5em',
};

const modalTextStyles = {
  marginBottom: '20px',
  fontSize: '1em',
};

// Button styles
const buttonContainerStyles = {
  display: 'flex',
  justifyContent: 'space-around', // Space buttons evenly
};

const buttonStyles = {
  margin: '5px',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '1em',
};

const confirmButtonStyles = {
  ...buttonStyles,
  backgroundColor: '#4caf50', // Green
  color: 'white',
};

const declineButtonStyles = {
  ...buttonStyles,
  backgroundColor: '#f44336', // Red
  color: 'white',
};

export default Card;
