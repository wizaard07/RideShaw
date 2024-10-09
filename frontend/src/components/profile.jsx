import React, { useEffect, useState } from 'react';
import Entries from './cards'; // Import the Entries component
import '../UserProfile.css'; // Import the CSS file for styling

const UserProfile = () => {
  const [user,setUser] = useState([]);

  useEffect(()=>{
    const getData = async() => {
      const response = await fetch("http://localhost:3001/api/user/get", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    const json = await response.json()
    setUser(json.user)
    }
    getData()
    // console.log(user)
  },[])

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="image d-flex flex-column justify-content-center align-items-center">
          <button className="btn btn-secondary">
            <img className="profile-pic"  src={user.profilePicture || "https://i.imgur.com/wvxPV9S.png"} alt="profile pic" height="100" width="100" />
          </button> 
          <span className="name mt-3">{user.username}</span>
          <span className="idd">{user.email}</span>

          <div className="text mt-3">
            <span>{user.contact}</span>
          </div>
          <div className="d-flex mt-2">
            <button className="btn btn-dark">Edit Profile</button>
          </div>
          <div className="d-flex mt-2">
            <button className="btn btn-dark">Check pending Requests</button>
          </div>
          <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
            <span><i className="fa fa-twitter"></i></span>
            <span><i className="fa fa-facebook-f"></i></span>
            <span><i className="fa fa-instagram"></i></span>
            <span><i className="fa fa-linkedin"></i></span>
          </div>
        </div>
      </div>

      {/* Right side list of entries */}
      <div className="entries-list">
        <Entries user={user._id} />
      </div>
    </div>
  );
};

export default UserProfile;
