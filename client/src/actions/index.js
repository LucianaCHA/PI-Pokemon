export const GET_ALL_DATA = "GET_ALL_DATA";
export const SET_PAGE = "SET_PAGE";
export const GET_BY_ID = "GET_BY_ID";
export const SET_NAME = "SET_NAME";
export const SET_ORIGIN = "SET_ORIGIN";


export const getAllData = (page, name, origin) => {
  return async function (dispatch) {
    return await fetch(`http://localhost:3001/pokemons?page=${page || 1}&&name=${name || ''}&&origin=${origin || ''}`)
      .then((res) => res.json())
      .then((allPokemons) => {
        console.log("promesa en action ", allPokemons.paginatedPokemons);
        console.log(allPokemons.length, 'length');
              return(dispatch({
                type: GET_ALL_DATA,
                payload: allPokemons
              }))

      }  )     
      .catch((error) => console.log(error));
  };
}

export const setPage = (page) => {
  console.log("page dispatched in action", page);
  return {
    type: SET_PAGE,
    payload: page,
  };
};

export const getById = (id) => {
  return async function (dispatch) {
    return await fetch(`http://localhost:3001/pokemons/${id}`)
      .then((res) => res.json())
      .then((selectedPokemon) => {
        console.log("selected pokemon en action ", selectedPokemon);
        return dispatch({
          type: GET_BY_ID,
          payload: selectedPokemon,
        });
      });
  };
};

// export const getByName = (name) => {
//   return async function (dispatch) {
//     return await fetch(`http://localhost:3001/pokemons/?name=${name}`)
//       .then((res) => res.json())
//       .then((selectedPokemon) => {
//         console.log("selected pokemon en action searching by name ", selectedPokemon);
//         return dispatch({
//           type: GET_BY_NAME,
//           payload: selectedPokemon
//         });
//       });
//   };
// };

export const setOrigin = (origin) => {
  console.log("el origin que paso a searchbar dispatched in action", origin);
  return {
    type: SET_ORIGIN,
    payload: origin
  };
};

export const setName = (name) => {
  console.log("el name que paso a searchbar dispatched in action", name);
  return {
    type: SET_NAME,
    payload: name
  };
};