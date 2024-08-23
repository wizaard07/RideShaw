import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  link
} from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
    <Home />
    <Navbar />
    </>
  );
}

export default App;
