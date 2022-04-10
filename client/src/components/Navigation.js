import React from "react";

import { NavLink } from "react-router-dom";

import { useDispatch } from "react-redux";

import { setOrigin, setPage, setName } from "../actions";

import SearchBar from "./SearchBar";

export const NavBar = () => {
  const dispatch = useDispatch();
  const handleClickReset = (e) => {
    dispatch(setOrigin(""));
    dispatch(setPage(1));
    dispatch(setName(""));
  };

  return (
    <nav>
      <NavLink to="/new">Create Pokemon</NavLink>
      <NavLink to="/home">
        <button onClick={handleClickReset}>HOME</button>
      </NavLink>

      <SearchBar />
    </nav>
  );
};
