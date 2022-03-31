export const GET_ALL_DATA = 'GET_ALL_DATA';
export const SET_PAGE = 'SET_PAGE';


export const getAllData=(page) =>{
    return async function (dispatch){
        return await fetch(`http://localhost:3001/pokemons?page=${page}`)
        .then((res) => res.json())
        .then((allPokemons) => {
            return dispatch({
                type: GET_ALL_DATA,
                payload: allPokemons
            });
        }).catch((error) => console.log(error))
    }
}

export const setPage =  (page) => {
    console.log('page dispatched in action', page)
    return {
        type : SET_PAGE,
        payload: page
    }
}