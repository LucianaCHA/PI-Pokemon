import React from 'react';

import {Route} from 'react-router-dom';

import './App.css';
import LandingPage from './components/LandingPage';
import { Home } from './components/Home';
import { PokemonDetail } from './components/PokemonDetail';
import  {NavBar}  from './components/Navigation';
import {Filters} from './components/Filters';


function App() {
  return (
    <div className="App">
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/home' component={Home} />
      <Route path='/home' component={NavBar} />
      <Route path='/filters' component={Filters} />
      <Route path='/home/:id' component={PokemonDetail} />
    </div>
  );
}

export default App;
