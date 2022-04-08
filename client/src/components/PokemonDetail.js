import React from "react";
import { useEffect } from "react";


import { useHistory } from "react-router-dom";
import{useDispatch, useSelector} from 'react-redux';

import { getById, getByName} from '../actions/index.js';


export function PokemonDetail(props) {
  
  const id = props.match.params.id;
  console.log('props', props)
  const name = props.location.search;
  console.log('ID es ', id ,'NAME query es ', name);


    const dispatch = useDispatch();
    const back = useHistory();

    const selectedPokemon = useSelector(state => state.selectedPokemon);    
    const goToBack = ()=>{
      back.goBack()
  }

    useEffect(() => {
        dispatch(getById(id));
  
        // dispatch(getById(id));
    
      
  }, [dispatch, id]);

    
      return selectedPokemon? (
          <>
{console.log('que trae selectedt', selectedPokemon)}
{console.log('que trae selectedt IMAGE', selectedPokemon.image)}
          
          
          
          <button onClick={goToBack}> <h1>🔙</h1>⏪</button>
          <h1>{selectedPokemon.name}</h1>
          <img src = {selectedPokemon.image} alt = {selectedPokemon.name} border= '1px solid #ddd' radius='45px' padding= '4px' width='250em' height='250em'/>;
          <h2>Stats</h2>
          <ul>
            <li>HP: {selectedPokemon.hp}</li>
            <li>Attack: {selectedPokemon.attack}</li>
            <li>Defense: {selectedPokemon.defense}</li>            
            <li>Speed: {selectedPokemon.speed}</li>
            <li>Weight: {selectedPokemon.weight}</li>
            <li>Height: {selectedPokemon.height}</li>
          </ul>

          <h2>Types</h2>
          <ul>
            {selectedPokemon?.types?.map((type) => { return <li key = {type}>{type.charAt(0).toUpperCase()+ type.slice(1).toLowerCase()}</li>})}
          </ul>


            {/* <div key = {selectedPokemon.id}>  

            <h1>{selectedPokemon.id}</h1> */}
        {/* <h3>{name}</h3>
            
           */}
    
{/*          
        </div> */}
      


          </>

) : (
    <h1>Loading</h1>
);
       
    }
    