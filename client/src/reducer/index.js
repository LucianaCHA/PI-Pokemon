// reducer funciones puras

import { GET_ALL_DATA, SET_PAGE} from "../actions.js";
const initialState = {
    allPokemons: [],
    page : 1, 
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_DATA:
            console.log('allPokemnons en el reducer')
            return {
                ...state,
                allPokemons: action.payload
            };

        case SET_PAGE:{
            console.log('SET_PAGE en el reducer')
            return {
                ...state,
                page: action.payload
            };
        }
        default:
            return state;
    }
}
