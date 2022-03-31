import React from 'react';

import {Route} from 'react-router-dom';

import './App.css';
import LandingPage from './components/LandingPage';
import {Home} from './components/Home';


function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Home} />
    </div>
  );
}

export default App;
