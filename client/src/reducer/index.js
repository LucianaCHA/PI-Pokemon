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
} from "../actions/index.js";

const initialState = {
  allPokemons: [],
  selectedPokemon: [],
  newPokemon: {},
  page: 1,
  name:'',
  origin:'',
  poketypes: [],
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

    case GET_BY_ID:{
      console.log("selectedbY ID  en el reducer", action.payload);
      return {
        ...state,
        selectedPokemon: action.payload,
      };
    }
      case SET_ORIGIN:{
        return {
          ...state,
          origin: action.payload,
        }
      }
      case SORT_BY:{
        
        let sortedPokemons;
        if(action.payload === 'az_up'){
          sortedPokemons = state.allPokemons.paginatedPokemons.sort((a,b) => {return a.name.localeCompare(b.name)});
          return
          
        }else if(action.payload === 'za_down'){
          sortedPokemons = state.allPokemons.paginatedPokemons.sort((a,b) => {return b.name.localeCompare(a.name)});
          
        }else if(action.payload === 'atk_down'){
          sortedPokemons = state.allPokemons.paginatedPokemons.sort((a,b) => {return a.attack - b.attack});
          
        }else if(action.payload === 'atk_up'){
          sortedPokemons = state.allPokemons.paginatedPokemons.sort((a,b) => {return b.attack - a.attack});
          
        }
        return {
          ...state,
          allPokemons: sortedPokemons,
        }
      }
        
        case GET_POKE_TYPES:{
          console.log("poketypes en el reducer", action.payload);
          return {
            ...state,
            poketypes: action.payload,
          }
        }
        
        case FILTER_BY_TYPE: {
          const all = state.selectedPokemon.paginatedPokemons;
          
            const filtered = action.payload === 'allTypes' ? all
            : all.filter(f => f.types?.includes(action.payload.charAt(0).toUpperCase() + action.payload.slice(1)));
            console.log(filtered, 'FILTRADO ACAAAAAA');
            console.log(state.allPokemons.paginatedPokemons, 'state.allPokemons.paginatedPokemons ACAAAAAA');
            console.log(action.payload, 'action.payload');

            return {
                ...state,
                selectedPokemons: filtered,
            }
          }

          case POST_POKEMON:
            console.log("ADD_POKEMON en el reducer", action.payload);
            return {
              ...state,
              
          }


    default:
      return state;
  }
}
