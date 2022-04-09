import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { sortBy, filterByType, getPokeTypes, filterOrigin} from "../actions/index";

import { Pokemon } from "./Pokemon";
import { Pagination } from "./Pagination";
import { ErrorPage } from "./ErrorPage";

import errorIMG from "../assets/E400.png";
//pokebola atributtion <a href="https://www.flaticon.es/iconos-gratis/pokemon" title="pokemon iconos">Pokemon iconos creados por Roundicons Freebies - Flaticon</a>



export const Filters = () => {
  const dispatch = useDispatch();

  const [order, setOrder] = React.useState("");

  const [page, setPage] = React.useState(1);

  const [filter, setFilter] = React.useState("");

  const[origin, setOrigin] = React.useState("");

  const start = (page - 1) * 12;
  const end = page * 12;

  //const allPokemons = useSelector((state) => state.allPokemons);
  const allPokemons = useSelector((state) => state.dataConsolidated);
  const poketypes = useSelector((state) => state.poketypes);

  const switchPage = (page) => {
    (setPage(page));
  };
  
  useEffect(() => {
    //dispatch(allData());
    dispatch(getPokeTypes());
  },[dispatch]);


  const handleFilterOrigin = (e) => {
    e.preventDefault();
    setOrigin(e.target.value);
    dispatch(filterOrigin(e.target.value));

    setPage(1)
    
    // dispatch(getAllData(e.target.value));
  };

  const handleSort = (e) => {
  e.preventDefault();
  setOrder(e.target.value)
  dispatch(sortBy(e.target.value));

  };

  const handleFilterType = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
    dispatch(filterByType(e.target.value));
    setPage(1);
  };

  return (
    <>
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
      </div>
  

      <div> 
      {
        
        allPokemons.length <= 0 ? (
          <ErrorPage error = {<img src={errorIMG} alt= 'NO coincidences' /> }/>
     ) : (
        allPokemons?.slice(start, end).map((pokemon) => {
          console.log(allPokemons, 'toRenderDelFront')
         return  ( <NavLink to={`/home/${pokemon.id}`} key = {pokemon.id+'filterView'}>
         <div className="Hola">
           <Pokemon
             name={pokemon.name}
             image={pokemon.image}
              types={pokemon.types}
           />
         </div>
         </NavLink>
         )
        
        }))
      }
      </div>


      <div className="Hola">
        <button disabled={page - 1 === 0} onClick={(e) => switchPage(page - 1)}>
          ◀️
        </button>
        {console.log("pages to show", allPokemons?.length / 12)}
        <Pagination
          totalPages={Math.ceil(allPokemons?.length / 12)}
          switchPage={switchPage}
          page={page}
        />
        
        {isNaN(allPokemons?.length / 12) || allPokemons?.length === 0
          ? "(╯°□°)╯L◓ading"
          : {page}/ (Math.ceil(allPokemons?.length / 12))|| ''}
        {/* https://www.fastemoji.com/(%E2%95%AF%C2%B0%E2%96%A1%C2%B0)%E2%95%AF%EF%B8%B5%E2%97%93-Meaning-Emoji-Emoticon-Throwpokeball-Ascii-Art-Pokemon-Throw-Battle-Japanese-Kaomoji-Smileys-62987.html */}
        <button
          disabled={page + 1 > Math.ceil(allPokemons?.length / 12)}
          onClick={(e) => switchPage(page + 1)}
        >
          ▶️
        </button>
      </div>
      
    </> )
}
