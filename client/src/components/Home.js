import React, { useEffect } from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';

import { getAllData, setOrigin, setPage } from '../actions/index.js';
import { Pokemon } from './Pokemon.js';
import { Pagination } from './Pagination.js';
import SearchBar from './SearchBar.js';

import '../App.css'
import ash from './ash-now.gif';


export function Home(){

    const dispatch = useDispatch();

    const {allPokemons, page, name, origin} = useSelector(state => state);   

    //quiero que cuando se monte elcomponente (tras el click en Go! aparezcan los pokémons)

    useEffect(() => {
        dispatch(getAllData(page, name, origin))
    }, [dispatch, page, name, origin]);

    const switchPage = (page) => {
        dispatch(setPage(page));
        dispatch(getAllData(page,name,origin));
        
    }

    const handleClickReset =(e) =>{
        e.preventDefault();
        dispatch(getAllData());
        console.log('QUE VIENE DEL RESET', page, name, origin);
    }

    const handleFilterOrigin = (e) => {    
        console.log(e.target.value, 'TARGET VALUE EN FILTER');    
            dispatch(setOrigin(e.target.value));
            // dispatch(getAllData(e.target.value));      

    }

    return (
        <>
        <nav><SearchBar/></nav>

                
         {            
            allPokemons.length <= 0 ?  <img src={ash} alt="loading..." /> : 
              allPokemons?.paginatedPokemons?.map((pokemon) => {
                   console.log('allpokemons to render?? ', allPokemons)
                    return (
                        <NavLink to = {`/home/${pokemon.id}`} key={pokemon.id} >
                        <div className='Hola' >
                            
                            <Pokemon
                            name ={pokemon.name}
                            image= {pokemon.image}
                            types={pokemon.types}
                            />
                        </div>     
                        </NavLink>                  
                            
                    )
                })}
              
                <br/>

                <br/>
                            { isNaN(allPokemons?.results/12)? <button onClick={(e) => handleClickReset(e) }>Reset Filters</button>  :
                <span>
               
                <button disabled ={page - 1 === 0} onClick = {(e) => switchPage(page - 1 )} >◀️</button>
               {console.log('pages to show', allPokemons?.results/12)}
                <Pagination
                totalPages={ Math.ceil(allPokemons?.results/12 )}
                switchPage={switchPage}
                page = {page}
                />
                {page}/{Math.ceil(allPokemons?.results/12)}

                <button disabled ={page + 1 > Math.ceil(allPokemons?.results / 12)} onClick = {(e) => switchPage(page + 1 )}>▶️</button>

                
                </span>

            }
            <div>
                <select onChange={handleFilterOrigin} value='all'>
                    <option defaultValue = 'all'>Filter by origin</option>
                    <option value = 'all'>All</option>
                    <option value= 'api'>Pokemons from Api</option>
                    <option value= 'db'>Pokemons from DB</option>
                </select>
                <button onClick={(e) => handleClickReset(e) }>Reset Filters</button>
            </div>
            </>
    )
}

