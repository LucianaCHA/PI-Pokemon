// reducer funciones puras

import {
  GET_ALL_DATA,
  SET_PAGE,
  GET_BY_ID,
  SET_NAME,
  SET_ORIGIN,
  SORT_BY,
  GET_POKE_TYPES,
  FILTER_BY_TYPE,
  POST_POKEMON,
  DATA_CONSOLIDATED,
  FILTER_ORIGIN,
} from "../actions/index.js";

const initialState = {
  allPokemons: [],
  selectedPokemon: [],
  newPokemon: {},
  page: 1,
  name: "",
  origin: "",
  poketypes: [],
  dataConsolidated: [],
  backData: [],
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

    case GET_BY_ID: {
      console.log("selectedbY ID  en el reducer", action.payload);
      return {
        ...state,
        selectedPokemon: action.payload,
      };
    }

    case SET_ORIGIN: {
      return {
        ...state,
        origin: action.payload,
      };
    }
    case SORT_BY: {
      const data = state.dataConsolidated;
      console.log(data, "state de data totsal en reducer de redux");
      let sortedPokemons;
      if (action.payload === "az_up") {
        sortedPokemons = data.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      } else if (action.payload === "za_down") {
        sortedPokemons = data.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      } else if (action.payload === "atk_down") {
        sortedPokemons = data.sort((a, b) => {
          return a.attack - b.attack;
        });
      } else if (action.payload === "atk_up") {
        sortedPokemons = data.sort((a, b) => {
          return b.attack - a.attack;
        });
      }
      return {
        ...state,
        allPokemons: sortedPokemons,
      };
    }

    case DATA_CONSOLIDATED: {
      console.log("consolidated en reducer ");
      return {
        ...state,
        backData: action.payload,
        dataConsolidated: action.payload,
      };
    }

    case GET_POKE_TYPES: {
      console.log("poketypes en el reducer", action.payload);
      return {
        ...state,
        poketypes: action.payload,
      };
    }

    case FILTER_BY_TYPE: {
      const backUp = state.backData;

      const all = backUp;

      const filtered =
        action.payload === ""
          ? all
          : all.filter((pokemon) =>
              pokemon.types?.includes(
                action.payload.charAt(0).toUpperCase() + action.payload.slice(1)
              )
            );

      return {
        ...state,
        dataConsolidated: filtered,
      };
    }

    case FILTER_ORIGIN: {
      const backUp = state.backData;
      const apiDB = backUp;
      const byOrigin = action.payload === 'api' ? apiDB.filter((pokemon) => !isNaN(pokemon.id)) : action.payload === 'db' ? apiDB.filter((pokemon) => isNaN(pokemon.id)) : apiDB ;

      return {
        ...state,
        dataConsolidated: byOrigin,
      };
    }


    case POST_POKEMON:
      console.log("ADD_POKEMON en el reducer", action.payload);
      return {
        ...state,    
      
      };

    // case CLEAR_STATE :
    //   return{
    //     ...state,

    //   }

    default:
      return state;
  }
}
