import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';  // Import Home correctly
import SignUp from './components/signup';
import SignIn from './components/signin';
import './style.css';
import Navbar from './components/navbar';
import UserProfile from './components/profile';
import UserState from './context/userState';
import AddEntry from './components/addEntry';
// import Counter from './counter';
import Entries from './components/cards';
import Pending from './components/pending'

function App() {
  return (
    <UserState>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/entry" element={<> <AddEntry /> </>} />
        <Route path="/profile" element={<> <UserProfile/> </>} />
        <Route path="/" element={<> <Home /></>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/entries" element={<Entries />} />
        <Route path="/pending" element={<Pending />} />
      </Routes>
    </Router>
    </UserState>
    // <>
    // <Counter/>
    // </>
  );
}

export default App;
