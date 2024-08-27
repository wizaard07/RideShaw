import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';  // Import Home correctly
import SignUp from './components/signup';
import SignIn from './components/signin';
import './style.css';
import Navbar from './components/navbar';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<> <Home /></>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>

  );
}

export default App;
