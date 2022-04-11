import React from "react";

import { NavLink } from "react-router-dom";

import { useDispatch } from "react-redux";

import { setOrigin, setPage, setName } from "../actions";

import SearchBar from "./SearchBar";

import styles from "./Navigation.module.css";

export const NavBar = () => {
  const dispatch = useDispatch();
  const handleClickReset = (e) => {
    dispatch(setOrigin(""));
    dispatch(setPage(1));
    dispatch(setName(""));
  };

  return (
    <nav className={styles.nav}>
      <NavLink to="/new">
        <button className={styles.btn}>Create Pokemon</button>
      </NavLink>
      <NavLink to="/home">
        <button className={styles.btn} onClick={handleClickReset}>
          HOME
        </button>
      </NavLink>

      <SearchBar />
    </nav>
  );
};
