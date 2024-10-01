import React from 'react';
import Entries from './cards'; // Import the Entries component
import '../UserProfile.css'; // Import the CSS file for styling

const UserProfile = () => {
  const user = {
    username: "John Doe",
    email: "john@gm.com",
    contact: "984324374",
    profilePicture: "",
    joinDate: "January 2023"
  };

  return (

    <div className="profile-container">
      <div className="profile-card">
        <div className="image d-flex flex-column justify-content-center align-items-center">
          <button className="btn btn-secondary">
            <img className="profile-pic"  src={user.profilePicture || "https://i.imgur.com/wvxPV9S.png"} alt="profile pic" height="100" width="100" />
          </button> 
          <span className="name mt-3">{user.username}</span>
          <span className="idd">{user.email}</span>
          <div className="d-flex mt-2">
            <button className="btn btn-dark">Edit Profile</button>
          </div>
          <div className="text mt-3">
            <span>{user.contact}</span>
          </div>
          <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
            <span><i className="fa fa-twitter"></i></span>
            <span><i className="fa fa-facebook-f"></i></span>
            <span><i className="fa fa-instagram"></i></span>
            <span><i className="fa fa-linkedin"></i></span>
          </div>
          <div className="px-2 rounded mt-4 date">
            <span className="join">Joined {user.joinDate}</span>
          </div>
        </div>
      </div>

      {/* Right side list of entries */}
      <div className="entries-list">
        <Entries />
      </div>
    </div>
  );
};

export default UserProfile;
