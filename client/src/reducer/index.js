// reducer funciones puras

import {
  GET_ALL_DATA,
  SET_PAGE,
  GET_BY_ID,
  GET_BY_NAME,
  SET_NAME,
} from "../actions/index.js";

const initialState = {
  allPokemons: [],
  selectedPokemon: [],
  page: 1,
  name:''
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_DATA:
      console.log("allPokemnons en el reducer", action.payload);
      return {
        ...state,
     
        allPokemons: action.payload,
        selectedPokemon: action.payload,
      };

    case SET_PAGE: {
      console.log("SET_PAGE en el reducer");
      return {
        ...state,
        page: action.payload,
      };
    }

    case SET_NAME: {
      console.log("SET_namE en el reducer", action.p);
      return {
        ...state,
        name: action.payload,
      };
    }

    case GET_BY_ID:
      console.log("selectedbY ID  en el reducer", action.payload);
      return {
        ...state,
        selectedPokemon: action.payload,
      };

    // case GET_BY_NAME:
    //   console.log("selectedbY NAME en el reducer", action.payload);
    //   return {
    //     ...state,
    //     selectedPokemon: action.payload
    //   };

    default:
      return state;
  }
}
