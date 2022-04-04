import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import {
  getAllData,  setOrigin,
  setPage,
  setName,
  sortBy,
  getPokeTypes,
  filterByType,
} from "../actions/index.js";
import { Pokemon } from "./Pokemon.js";
import { Pagination } from "./Pagination.js";
import SearchBar from "./SearchBar.js";

import "../App.css";
import ash from "./ash-now.gif";

export function Home() {
  const dispatch = useDispatch();

  // const allPokemons = useSelector((state) => state.allPokemons);
  const { page, name, origin, allPokemons, poketypes, selectedPokemon } =
    useSelector((state) => state);

  //quiero que cuando se monte elcomponente (tras el click en Go! aparezcan los pokémons)

  useEffect(() => {
    dispatch(getAllData(page, name, origin));
    dispatch(getPokeTypes());
    console.log("allPokemons", allPokemons);
  }, [dispatch, page, name, origin]);

  const switchPage = (page) => {
    dispatch(getAllData(page, name, origin));
    dispatch(setPage(page));
  };
  //clean state
  const handleClickReset = (e) => {
    dispatch(setOrigin(""));
    dispatch(setPage(1));
    dispatch(setName(""));
  };

  const handleFilterOrigin = (e) => {
    e.preventDefault();
    console.log(e.target.value, "TARGET VALUE EN FILTER");
    dispatch(setOrigin(e.target.value));
    // dispatch(getAllData(e.target.value));
  };

  const handleSort = (e) => {
    e.preventDefault();
    console.log(allPokemons, "enSort");
    dispatch(sortBy(e.target.value));
  };

  const handleFilterType = (e) => {
    e.preventDefault();
    dispatch(filterByType(e.target.value));
    //setPage(1);
  };

  return (
    <>
      <nav>
        <SearchBar />
      </nav>

      {allPokemons.length <= 0 ? (
        <img src={ash} alt="loading..." />
      ) : (
        allPokemons?.paginatedPokemons?.map((pokemon) => {
          console.log("allpokemons to render?? ", allPokemons);
          return (
            <NavLink to={`/home/${pokemon.id}`} key={pokemon.id}>
              <div className="Hola">
                <Pokemon
                  name={pokemon.name}
                  image={pokemon.image}
                  types={pokemon.types}
                />
              </div>
            </NavLink>
          );
        })
      )}

      <br />

      <br />
      {isNaN(allPokemons?.results / 12) ? (
        <button onClick={(e) => handleClickReset(e)}>Reset Filters</button>
      ) : (
        <span>
          <button
            disabled={page - 1 === 0}
            onClick={(e) => switchPage(page - 1)}
          >
            ◀️
          </button>
          {console.log("pages to show", allPokemons?.results / 12)}
          <Pagination
            totalPages={Math.ceil(allPokemons?.results / 12)}
            switchPage={switchPage}
            page={page}
          />
          {page}/{Math.ceil(allPokemons?.results / 12)}
          <button
            disabled={page + 1 > Math.ceil(allPokemons?.results / 12)}
            onClick={(e) => switchPage(page + 1)}
          >
            ▶️
          </button>
        </span>
      )}
      <div>
        <select onChange={handleFilterOrigin}>
          <option defaultValue="all">Filter by origin</option>
          <option value="all">All</option>
          <option value="api">Pokemons from Api</option>
          <option value="db">Pokemons from DB</option>
        </select>

        <select onChange={handleSort}>
          <option defaultValue="">Sort by:</option>
          <option value="az_up">A-Z</option>
          <option value="za_down">Z-A</option>
          <option value="atk_down">Strongest first</option>
          <option value="atk_up">Weakest first</option>
        </select>

        <select onChange={handleFilterType}>
          <option defaultValue="all">Filter by type</option>
          {poketypes?.map((type) => {
            return (
              <option value={type.name.charAt(0) + type.name.slice(1)}>
                {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
              </option>
            );
          })}
        </select>

        <button onClick={(e) => handleClickReset(e)}>Reset Filters</button>
      </div>
    </>
  );
}
