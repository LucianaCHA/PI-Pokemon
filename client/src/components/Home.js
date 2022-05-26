import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import {
  getAllData,
  setPage,
  getPokeTypes,
  allData,
} from "../actions/index.js";

import { Pokemon } from "./Pokemon.js";
import { Pagination } from "./Pagination.js";
import { Filters } from "./Filters.js";
import { ErrorPage } from "./ErrorPage.js";
import SearchBar from "./SearchBar.js";

import ash from "./ash-now.gif";
import errorIMG from "../assets/E404.png";

import "../App.css";
import styles from "./Home.module.css";

export function Home() {
  const dispatch = useDispatch();

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
  }, [data]);

  useEffect(() => {
      dispatch(getAllData(page, name, origin));
      window.scroll(0, 0)

  }, [dispatch, page, origin, name]);


  const switchPage = (page) => {
    // dispatch(getAllData(page, name, origin));
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
    // dispatch(setPage(1));
    // dispatch(setOrigin(e.target.value));
    dispatch(getAllData(1, '', e.target.value));
    
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
    {data === 'back'? <SearchBar /> : null}
      <aside className={styles.aside}>
        <button className={styles.btnAside} onClick={handleClick} value="api">
          Check Api!
        </button>
        <button className={styles.btnAside} onClick={handleClick} value="db">
          Check yours!
        </button>
        <button className={styles.btnAside} onClick={() => setData("front")}>
          More filters!
        </button>
      </aside>

      <div className={styles.homeContainer}>
        {data === "front" ? (
          <Filters />
        ) : allPokemons.length <= 0 ? (
          <img className={styles.loading} src={ash} alt="loading..." />
        ) : allPokemons === "Not found" ? (
          <ErrorPage className={styles.img}error={<img src={errorIMG} alt="Not found" />}/>
        ) : (          
          allPokemons?.paginatedPokemons.map((pokemon) => {
            return (
              <div className={styles.container} key={pokemon.id+'hola'}>
              <NavLink to={`/home/${pokemon.id}`}>            

                  <Pokemon
                  key={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.image}
                    types={pokemon.types}
                  />                            

              </NavLink>

              </div>
            );
          })
        )}

        {data === "back" ? (
          <div className={styles.pagination}>
            <button className={styles.btn}
              disabled={page - 1 === 0}
              onClick={(e) => switchPage(page - 1)}
              hidden={page === 1 && isNaN(allPokemons?.results / 12)}
            >
              ◀️
            </button>
            <Pagination 
              totalPages={Math.ceil(allPokemons?.results / 12)}
              switchPage={switchPage}
              page={page}
            />
            <button className={styles.btn}
              disabled={page + 1 > Math.ceil(allPokemons?.results / 12)}
              onClick={(e) => switchPage(page + 1)}
              hidden={page === 1 && isNaN(allPokemons?.results / 12)}
            >
              ▶️
            </button>
            <button className={styles.btn} hidden={<ErrorPage />}>
              {page}/
              {isNaN(allPokemons?.results / 12)
                ? "L◓ading pages..."
                : Math.ceil(allPokemons?.results / 12)}
              {/* https://www.fastemoji.com/(%E2%95%AF%C2%B0%E2%96%A1%C2%B0)%E2%95%AF%EF%B8%B5%E2%97%93-Meaning-Emoji-Emoticon-Throwpokeball-Ascii-Art-Pokemon-Throw-Battle-Japanese-Kaomoji-Smileys-62987.html */}
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
}
