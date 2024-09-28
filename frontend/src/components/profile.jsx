import React, { useEffect, useState, useContext } from 'react';
import '../UserProfile.css'; // Import the CSS file for styling
import userContext from "../context/userContext";

const UserProfile = () => {
  const context = useContext(userContext);
  const { getUser } = context;

  const [user, setUser] = useState({
    username: "",
    email: "",
    contact: "",
    password: "",  // Add any additional fields you need here
  });

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();  // Fetch user data
      if (userData) {
        console.log(userData);
        setUser(userData);  // Update the state with the fetched data
      }
    };
    
    fetchUser();  // Call the fetch function on component mount
  }, []);  // Empty dependency array means this effect runs once when the component mounts


  console.log(user)
  return (
    <div className="container">
      <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
        <div className="card p-4">
          <div className="image d-flex flex-column justify-content-center align-items-center">
            <button className="btn btn-secondary">
              <img src={user.profilePicture || "https://i.imgur.com/wvxPV9S.png"} alt="profile pic" height="100" width="100" />
            </button>
            <span className="name mt-3">{user.username || "John Doe"}</span>
            <span className="idd">{user.email || "john@gm.com"}</span>
            <div className="d-flex mt-2">
              <button className="btn btn-dark">Edit Profile</button>
            </div>
            <div className="text mt-3">
              <span>{user.contact || "984324374"}</span>
            </div>
            <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
              <span><i className="fa fa-twitter"></i></span>
              <span><i className="fa fa-facebook-f"></i></span>
              <span><i className="fa fa-instagram"></i></span>
              <span><i className="fa fa-linkedin"></i></span>
            </div>
            <div className="px-2 rounded mt-4 date">
              <span className="join">Joined {user.joinDate || "Date not available"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
