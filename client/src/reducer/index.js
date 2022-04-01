// reducer funciones puras

import { GET_ALL_DATA, SET_PAGE, GET_BY_ID } from "../actions.js";

const initialState = {
  allPokemons: [],
  page: 1,
  selectedPokemon: [],
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DATA:
      console.log("allPokemnons en el reducer", action.payload);
      return {
        ...state,
        allPokemons: action.payload,
      };

    case SET_PAGE: {
      console.log("SET_PAGE en el reducer");
      return {
        ...state,
        page: action.payload,
      };
    }

    case GET_BY_ID:
      console.log("selectedbY ID  en el reducer", action.payload);
      return {
        ...state,
        selectedPokemon: action.payload,
      };

    default:
      return state;
  }
}
