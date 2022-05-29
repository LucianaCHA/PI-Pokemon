import React from "react";

import { Route } from "react-router-dom";


import LandingPage from "./components/LandingPage";
import { Home } from "./components/Home";
import { PokemonDetail } from "./components/PokemonDetail";
import { NavBar } from "./components/Navigation";
import { CreatePokemon } from "./components/CreatePokemon";

import "./index.css";


function App() {
  return (
    <div className='App'>
      
      <Route path="/home" component={NavBar}/>
      <Route exact path="/" component={LandingPage}/>
      <Route exact path="/new" component={CreatePokemon}/>
      <Route path="/home/:id" component={PokemonDetail}/>

      <Route exact path="/home" component={Home} />
      
    </div>
  );
}

export default App;
