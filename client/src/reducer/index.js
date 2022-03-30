// reducer funciones puras

import { GET_ALL_DATA } from "../actions.js";
const initialState = {
    allPokemons: [],
}

export function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_DATA:
            console.log('allPokemnons en el reducer')
            return {
                ...state,
                allPokemons: action.payload
            };
        default:
            return state;
    }
}
