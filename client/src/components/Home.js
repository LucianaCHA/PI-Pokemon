import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import {
  getAllData,
  setOrigin,
  setPage,
  getPokeTypes,
  allData,
} from "../actions/index.js";
import { Pokemon } from "./Pokemon.js";
import { Pagination } from "./Pagination.js";
import { Filters } from "./Filters.js";
import { ErrorPage } from "./ErrorPage.js";

import "../App.css";
import ash from "./ash-now.gif";
import errorIMG from "../assets/E404.png";

export function Home() {
  const dispatch = useDispatch();

  // const allPokemons = useSelector((state) => state.allPokemons);
  const { page, name, origin, allPokemons } = useSelector((state) => state);

  const [data, setData] = React.useState("back");

  useEffect(() => {
    if (data === "back") {
      dispatch(getAllData(page, name, origin));
      dispatch(getPokeTypes());
      dispatch(allData());
    } else if (data === "front") {
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
    setData("back");
    dispatch(setOrigin(e.target.value));
  };

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
        <button onClick={handleClick} value="api">
          Check Api!
        </button>
        <button onClick={handleClick} value="db">
          Check yours!
        </button>
        <button onClick={() => setData("front")}>Filters!</button>
      </nav>

      {console.log(allPokemons.length, "allPokemons.length antes del map")}
      {console.log("allpokemons to render?? ", allPokemons)}
      {data === "front" ? (
        <Filters />
      ) : allPokemons.length <= 0 ? (
        <img src={ash} alt="loading..." />
      ) : allPokemons === "Pokemon does not exists" ? (
        <ErrorPage error={<img src={errorIMG} alt="NOt found" />} />
      ) : (
        allPokemons?.paginatedPokemons?.map((pokemon) => {
          console.log(allPokemons.length, "allPokemons.length enel map");
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
      {data === "back" ? (
        <div className="Hola">
          <button
            disabled={page - 1 === 0}
            onClick={(e) => switchPage(page - 1)}
            hidden={page === 1 && isNaN(allPokemons?.results / 12)}
          >
            ◀️
          </button>
          {console.log("pages to show", allPokemons?.results / 12)}
          <Pagination
            totalPages={Math.ceil(allPokemons?.results / 12)}
            switchPage={switchPage}
            page={page}
          />
          {page}/
          {isNaN(allPokemons?.results / 12)
            ? 1 || "L◓ading pages..."
            : Math.ceil(allPokemons?.results / 12)}
          {/* https://www.fastemoji.com/(%E2%95%AF%C2%B0%E2%96%A1%C2%B0)%E2%95%AF%EF%B8%B5%E2%97%93-Meaning-Emoji-Emoticon-Throwpokeball-Ascii-Art-Pokemon-Throw-Battle-Japanese-Kaomoji-Smileys-62987.html */}
          <button
            disabled={page + 1 > Math.ceil(allPokemons?.results / 12)}
            onClick={(e) => switchPage(page + 1)}
            hidden={page === 1 && isNaN(allPokemons?.results / 12)}
          >
            ▶️
          </button>
        </div>
      ) : null}
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
