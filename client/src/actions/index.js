import axios from 'axios';

export const GET_ALL_DATA = "GET_ALL_DATA";
export const SET_PAGE = "SET_PAGE";
export const GET_BY_ID = "GET_BY_ID";
export const SET_NAME = "SET_NAME";
export const SET_ORIGIN = "SET_ORIGIN";
export const SORT_BY = "SORT_BY";
export const GET_POKE_TYPES = "GET_POKE_TYPES";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const POST_POKEMON = "POST_POKEMON";
export const DATA_CONSOLIDATED = "DATA_CONSOLIDATED";
export const FILTER_ORIGIN = "FILTER_ORIGIN";
export const DELETE_POKEMON = "DELETE_POKEMON";
export const FILTER_NAME = "FILTER_NAME";
export const CLEAN = "CLEAN"

export const getAllData = (page, name, origin) => async dispatch => {
  try{
    const res = await axios(`/pokemons?page=${page || 1}&&name=${name || ""}&&origin=${origin || ""}`);
    return dispatch({
      type: GET_ALL_DATA,
      payload: res.data
    })

  }
  catch (error) {
    console.log(error);
  }
        
}
// export const catchAllPokemon = () => async dispatch => {
//   const pokemons = await axios.get('/pokemons')
//   return dispatch({
//       type: CATCH_ALL_POKEMON,
//       payload: pokemons.data
//   })
// }
// export const getAllData = (page, name, origin) => {
//   return async function (dispatch) {
//     return await fetch(
//       `/pokemons?page=${page || 1}&&name=${name || ""}&&origin=${origin || ""}`
//     )
//       .then((res) => res.json())
//       .then((allPokemons) => {
//         return dispatch({
//           type: GET_ALL_DATA,
//           payload: allPokemons,
//         });
//       }).catch((error) => console.log(error));
//   };
// };

export const allData = () => async dispatch => {
  try{
    const res = await axios('/pokemons/allPokemons');
    return dispatch({
      type: DATA_CONSOLIDATED,
      payload: res.data
    })

  }
  catch (error) {
    console.log(error);
  }
        
}

// export const allData = () => {
//   return async function (dispatch) {
//     return await fetch("/pokemons/allPokemons")
//       .then((data) => data.json())
//       .then((dataConsolidated) => {
//         return dispatch({
//           type: DATA_CONSOLIDATED,
//           payload: dataConsolidated, 
//         });
//       })
//       .catch((error) => console.log(error));
//   };
// };

export const getPokeTypes = () => async dispatch => {
  try{
    const res = await axios('/types');
    return dispatch({
      type: GET_POKE_TYPES,
      payload: res.data
    })

  }
  catch (error) {
    console.log(error);
  }
        
}
// export const getPokeTypes = () => {
//   return async function (dispatch) {
//     return await fetch(`/types`)
//       .then((res) => res.json())
//       .then((pokeTypes) => {
//         return dispatch({
//           type: GET_POKE_TYPES,
//           payload: pokeTypes,
//         });
//       })
//       .catch((error) => console.log(error));
//   };
// };

export const setPage = (page) => {
  return {
    type: SET_PAGE,
    payload: page,
  };
};

export const getById = (id) => async dispatch => {
  try{
    const res = await axios(`/pokemons/${id}`);
    return dispatch({
      type: GET_BY_ID,
      payload: res.data
    })
  }
  catch (error) {
    console.log(error);
  }        
}
// export const getById = (id) => {
//   return async function (dispatch) {
//     return await fetch(`/pokemons/${id}`)
//       .then((res) => res.json())
//       .then((selectedPokemon) => {
//         return dispatch({
//           type: GET_BY_ID,
//           payload: selectedPokemon,
//         });
//       })
//       .catch((error) => {
//         return error;
//       });
//   };
// };

export const setName = (name) => {
  return {
    type: SET_NAME,
    payload: name,
  };
};

export const setOrigin = (origin) => {
  return {
    type: SET_ORIGIN,
    payload: origin,
  };
};

export const sortBy = (sortBy) => {
  return {
    type: SORT_BY,
    payload: sortBy,
  };
};

export const filterByType = (type) => {
  return {
    type: FILTER_BY_TYPE,
    payload: type,
  };
};

export const filterOrigin = (origin) => {
  return {
    type: FILTER_ORIGIN,
    payload: origin,
  };
};

export const filterByName = (name) => {
  return {
    type: FILTER_NAME,
    payload: name,
  }
}

export const postPokemon = (pokemon) => async dispatch => {
  try{
    const res = await axios.post('/pokemons', pokemon);
    return dispatch({
      type: POST_POKEMON,
      payload: res.data
    })
  }
  catch (error) {
    console.log(error);
  }        
}

// export const postPokemon = (pokemon) => {
//   return async function (dispatch) {
//     return await fetch(`/pokemons`, {
//       method: "POST",
//       body: JSON.stringify(pokemon),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => res.json())
//       .catch((error) => console.error("Error:", error))
//       .then((newPokemon) => {
//         return dispatch({
//           type: POST_POKEMON,
//           payload: newPokemon,
//         });
//       });
//   };
// };


export const deletePokemon = (id) => {
  return async function (dispatch) {
    return await fetch(`/pokemons/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((deletedPokemon) => {
        return dispatch({
          type: DELETE_POKEMON,
          payload: deletedPokemon,
        });
      });
  }
}

export const clean =() =>{
  return function (dispatch){
    return dispatch({
      type: CLEAN,
    })
  }

  
}
// export const deletePokemon = payload => async dispatch => {
//   return await axios.delete('/pokemons', {data: payload});
//};