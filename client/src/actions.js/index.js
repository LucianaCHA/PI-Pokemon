export const GET_ALL_DATA = 'GET_ALL_DATA'


export const getAllData=() =>{
    return async function (dispatch){
        return await fetch(`http://localhost:3001/pokemons`)
        .then((res) => res.json())
        .then((allPokemons) => {
            console.log('fetch en action, invoco a all pokemons', allPokemons);
            return dispatch({
                type: GET_ALL_DATA,
                payload: allPokemons
            });
        }).catch((error) => console.log(error))
    }
}