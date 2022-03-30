import React, { useEffect } from 'react';

import {useDispatch, useSelector} from 'react-redux';

import { NavLink } from 'react-router-dom';

import { getAllData } from '../actions.js';
import { Pokemon } from './Pokemon.js';

import '../App.css'
export function Home(){

    const dispatch = useDispatch();

    const allPokemons = useSelector(state => state.allPokemons);

    //quiero que cuando se monte elcomponente (tras el click en Go! aparezcan los pokémons)

    useEffect(() => {
        dispatch(getAllData())
    }, [dispatch])


    return (
        <>
            <h1> soy el home :)</h1>
            
               { allPokemons?.map((pokemon) => {
                   console.log('allpokemons to render?? ', allPokemons)
                    return (
                        <div className='Hola'>
                            <NavLink to = { `/pokemons/${pokemon.id}`}>
                                <h3>{pokemon.name}</h3> 
                            </NavLink>
                            <Pokemon
                            name ={pokemon.name}
                            art= {pokemon.art}
                            types={pokemon.types}
                            />
                        </div>

                    )
                })}
            </>
    )
}

