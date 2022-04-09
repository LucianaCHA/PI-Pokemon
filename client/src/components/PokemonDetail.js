import React from "react";
import { useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ErrorPage } from "./ErrorPage";
import { getById } from "../actions/index.js";

import errorIMG from '../assets/E404.png';

export function PokemonDetail(props) {
  const id = props.match.params.id;

  const dispatch = useDispatch();
  const back = useHistory();

  const selectedPokemon = useSelector((state) => state.selectedPokemon);

  const goToBack = () => {
    back.goBack();
  };

  useEffect(() => {
    dispatch(getById(id));

    // dispatch(getById(id));
  }, [dispatch, id]);

  return selectedPokemon === "Not Found" ? (
    <ErrorPage error={<img src={errorIMG} alt="NOt found" />}/>
  ) : (
    <>
      
      <button onClick={goToBack}>🔙</button>
      <h1>{selectedPokemon.name}</h1>
      <img
        src={selectedPokemon.image}
        alt={selectedPokemon.name}
        border="1px solid #ddd"
        radius="45px"
        padding="4px"
        width="250em"
        height="250em"
      />
      <p>#{selectedPokemon.id}</p>
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
        {selectedPokemon?.types?.map((type) => {
          return (
            <li key={type}>
              {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
            </li>
          );
        })}
      </ul>
    </>
  );
 
}
