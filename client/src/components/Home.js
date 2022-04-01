import React, { useEffect } from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {NavLink} from 'react-router-dom';

import { getAllData, setPage } from '../actions.js';
import { Pokemon } from './Pokemon.js';
import { Pagination } from './Pagination.js';

import '../App.css'
import ash from './ash-now.gif';


export function Home(){

    const dispatch = useDispatch();

    const {allPokemons, page} = useSelector(state => state);
    

    //quiero que cuando se monte elcomponente (tras el click en Go! aparezcan los pokémons)

    useEffect(() => {
        dispatch(getAllData(page));
    }, [dispatch, page]);

    const switchPage = (page) => {
        dispatch(getAllData(page));
        dispatch(setPage(page));
    }

    return (
        <>
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
                <span>
                <button disabled ={page - 1 === 0} onClick = {(e) => switchPage(page - 1 )} >◀️</button>
               
                <Pagination
                totalPages={ allPokemons?.results/12 }
                switchPage={switchPage}
                page = {page}
                />

                <button disabled ={page + 1 > allPokemons?.results / 12} onClick = {(e) => switchPage(page + 1 )}>▶️</button>

                </span>
                

                
            </>
    )
}
