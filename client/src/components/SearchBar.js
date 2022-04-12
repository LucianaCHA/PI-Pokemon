import React from "react";

import { useDispatch } from "react-redux";

import { setName, setPage } from "../actions";

import styles from "./SearchBar.module.css";

const SearchBar = () => {
  const [search, setSearch] = React.useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setName(search));
    //dispatch(setPage(1));
    setSearch("");
    //setName("");

    dispatch(setPage(1));
  };

  return (
    <div className={styles.searchBar}>
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.form}
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleChange}
      />

      <button className={styles.btn} type="submit">
        Search
      </button>
    </form>
    </div>
  );
};
export default SearchBar;
