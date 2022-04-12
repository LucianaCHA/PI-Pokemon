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
//export const ERROR_STATUS = "ERROR_STATUS";
export const EMPTY_STATE = "EMPTY_STATE";
export const FILTER_NAME = "FILTER_NAME";

export const getAllData = (page, name, origin) => {
  return async function (dispatch) {
    return await fetch(
      `http://localhost:3001/pokemons?page=${page || 1}&&name=${name || ""}&&origin=${origin || ""}`
    )
      .then((res) => res.json())
      .then((allPokemons) => {
        return dispatch({
          type: GET_ALL_DATA,
          payload: allPokemons,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const allData = () => {
  return async function (dispatch) {
    return await fetch("http://localhost:3001/pokemons/allPokemons")
      .then((data) => data.json())
      .then((dataConsolidated) => {
        return dispatch({
          type: DATA_CONSOLIDATED,
          payload: dataConsolidated, // RESULTS IS ARRAY {}
        });
      })
      .catch((error) => console.log(error));
  };
};

export const getPokeTypes = () => {
  return async function (dispatch) {
    return await fetch(`http://localhost:3001/types`)
      .then((res) => res.json())
      .then((pokeTypes) => {
        return dispatch({
          type: GET_POKE_TYPES,
          payload: pokeTypes,
        });
      })
      .catch((error) => console.log(error));
  };
};

export const setPage = (page) => {
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
        return dispatch({
          type: GET_BY_ID,
          payload: selectedPokemon,
        });
      })
      .catch((error) => {
        return error;
      });
  };
};

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

export const postPokemon = (pokemon) => {
  console.log(pokemon, "objeto como parametro en action ");
  return async function (dispatch) {
    return await fetch(`http://localhost:3001/pokemons`, {
      method: "POST",
      body: JSON.stringify(pokemon),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((newPokemon) => {
        return dispatch({
          type: POST_POKEMON,
          payload: newPokemon,
        });
      });
  };
};

export const emptyState = () => {
  return {
    type: EMPTY_STATE,
    payload: {},
  };
};
