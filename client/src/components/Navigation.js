import React from "react";

import { NavLink } from "react-router-dom";

import { useDispatch, useSelector} from "react-redux";

import { setOrigin, setPage, setName, getAllData } from "../actions";

import { Pokemon } from "./Pokemon";
import SearchBar from "./SearchBar";

export const NavBar = () => {

    const dispatch = useDispatch();
  const handleClickReset = (e) => {
    dispatch(setOrigin(''));
    dispatch(setPage(1));
    dispatch(setName(''));
  };

  return (
    <nav>
      <NavLink to="/home">
        <button
          onClick={handleClickReset}
          >HOME</button>
        
      </NavLink>

      <SearchBar />

      <NavLink to="/new">Create Pokemon</NavLink>
    </nav>
  );
};
