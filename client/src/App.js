import React from 'react';
import './App.css';
import Logo from './logo.png'
import Launches from './components/launches'
import Launch from './components/launch'
import { Route} from 'react-router-dom'

function App() {
  return (
      <div className="container">
        <img src={Logo}
          alt="SpaceX"
          style={{ width: 300, display: 'block', margin: 'auto' }}
        />
        < Route path = "/"
        exact component = {
          Launches
        }
        />
        < Route path = "/launch/:flight_number"
        exact component = {
          Launch
        }
        />
        </div>
  );
}

export default App;
