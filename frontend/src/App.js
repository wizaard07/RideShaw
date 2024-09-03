import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';  // Import Home correctly
import SignUp from './components/signup';
import SignIn from './components/signin';
import './style.css';
import Navbar from './components/navbar';
import UserProfile from './components/profile';
import UserState from './context/userState';


function App() {
  return (
    <UserState>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/profile" element={<> <UserProfile/> </>} />
        <Route path="/" element={<> <Home /></>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
    </UserState>

  );
}

export default App;
