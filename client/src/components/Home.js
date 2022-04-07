import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

import {getAllData, setOrigin, setPage, setName,sortBy, getPokeTypes, filterByType, allData} from "../actions/index.js";
import { Pokemon } from "./Pokemon.js";
import { Pagination } from "./Pagination.js";
import SearchBar from "./SearchBar.js";

import "../App.css";
import ash from "./ash-now.gif";
import {Filters} from './Filters.js'

export function Home() {

  const dispatch = useDispatch();

  // const allPokemons = useSelector((state) => state.allPokemons);
  const { page, name, origin, allPokemons, poketypes, dataConsolidated, selectedPokemon } =
    useSelector((state) => state);

  //quiero que cuando se monte elcomponente (tras el click en Go! aparezcan los pokémons)
  const [data, setData] = React.useState('back');console.log(data, "DATA")

  const [order, setOrder] = React.useState('');


  useEffect(() => {
    if(data === 'back'){
    dispatch(getAllData(page, name, origin));
    dispatch(getPokeTypes());
    }else if (data === 'front'){      
      dispatch(allData());      
    }
  }, [dispatch, page, origin, name]);



  const switchPage = (page) => {
    dispatch(getAllData(page, name, origin));
    dispatch(setPage(page));
  };

  //clean state
  // const handleClickReset = (e) => {
  //   dispatch(setOrigin(""));
  //   dispatch(setPage(1));
  //   dispatch(setName(""));
  // };

  // const handleFilterOrigin = (e) => {
  //   e.preventDefault();
  //   setData('back')
  //   console.log(e.target.value, "TARGET VALUE EN FILTER");
  //   dispatch(setOrigin(e.target.value));
  //   // dispatch(getAllData(e.target.value));
  // };

  const handleClick = (e) => {
    e.preventDefault();
    setData('back')
    dispatch(setOrigin(e.target.value));
  }
  

  // const handleSort = (e) => {
  // e.preventDefault();
  // setOrder(e.target.value)
  // setData('front')
  // dispatch(sortBy(e.target.value));
  // setOrder(e.target.value)
  // };

  // const handleFilterType = (e) => {
  //   e.preventDefault();
  //   dispatch(setData('front'));
  //   dispatch(filterByType(e.target.value));
  //   //setPage(1);
  // };

  return (
    <>  
      <nav>
        
        <button onClick={handleClick} value= 'api'>Check Api!</button>
        <button onClick={handleClick} value= 'db'>Check yours!</button>
        <button onClick={() => setData('front')}>Filters!</button>        
      </nav>

    
     { 
       data === 'front' ? <Filters /> :
       allPokemons.length <= 0 ? (
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
       }))
    } 
    {data === 'back' ? 
      <div className="Hola">
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
          {page}/{isNaN(allPokemons?.results / 12) ? '(╯°□°)╯L◓ading' : Math.ceil(allPokemons?.results / 12)}
         {/* https://www.fastemoji.com/(%E2%95%AF%C2%B0%E2%96%A1%C2%B0)%E2%95%AF%EF%B8%B5%E2%97%93-Meaning-Emoji-Emoticon-Throwpokeball-Ascii-Art-Pokemon-Throw-Battle-Japanese-Kaomoji-Smileys-62987.html */}
          <button
            disabled={page + 1 > Math.ceil(allPokemons?.results / 12)}
            onClick={(e) => switchPage(page + 1)}
          >
            ▶️
          </button>
        </div>
        : '. . .'
    }
      </>
  );
}



//  {/* {data === 'front'&& allPokemons?.paginatedPokemons?.map((data) =>{
// return (<NavLink to={`/home/${data.id}`} key={data.id}>
//               <div className="Hola">
//                 <Pokemon
//                   name={data.name}
//                   image={data.image}
//                   types={data.types}
//                 />
//               </div>
//             </NavLink>)

// }) }: {
//       allPokemons.length <= 0 ? (
//         <img src={ash} alt="loading..." />
//       ) : (
//         allPokemons?.paginatedPokemons?.map((pokemon) => {
//           console.log("allpokemons to render?? ", allPokemons);
//           return (
//             <NavLink to={`/home/${pokemon.id}`} key={pokemon.id}>
//               <div className="Hola">
//                 <Pokemon
//                   name={pokemon.name}
//                   image={pokemon.image}
//                   types={pokemon.types}
//                 />
//               </div>
//             </NavLink>
//           );
//         })
//       // )} */}

//       // <br />

//       // <br />
//       // {isNaN(allPokemons?.results / 12) ? (
//       //   <button onClick={(e) => handleClickReset(e)}>Reset Filters</button>
//       // ) : (
        
//       // <div>
//       //       <select onChange={handleFilterOrigin}>
//       //     <option defaultValue="all">Filter by origin</option>
//       //     <option value="all">All</option>
//       //     <option value="api">Pokemons from Api</option>
//       //     <option value="db">Pokemons from DB</option>
//       //   </select>

        

//       //   <select onChange={handleSort}>
//       //     <option defaultValue="">Sort by:</option>
//       //     <option value="az_up">A-Z</option>
//       //     <option value="za_down">Z-A</option>
//       //     <option value="atk_down">Strongest first</option>
//       //     <option value="atk_up">Weakest first</option>
//       //   </select>

//       //   <select onChange={handleFilterType}>
//       //     <option defaultValue="all">Filter by type</option>
//       //     {poketypes?.map((type) => {
//       //       return (
//       //         <option value={type.name.charAt(0) + type.name.slice(1)}>
//       //           {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
//       //         </option>
//       //       );
//       //     })}
//       //   </select>

//       //   <button onClick={(e) => handleClickReset(e)}>Reset Filters</button>
//       // </div>

