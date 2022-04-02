import React from "react";

import { useDispatch } from "react-redux";
import { getAllData, getByName, setPage, setName } from "../actions";

const SearchBar = () => {
const [search, setSearch] = React.useState('');

const dispatch = useDispatch();

const handleChange = (e) => {
    setSearch(e.target.value);
}

    const handleSubmit = (e) => {
      e.preventDefault()
      dispatch(setName(search));
      //dispatch(setPage(1));
      
      
      setSearch('');
     // setName('');
     
      // dispatch(setPage(1));
      // dispatch(getAllData({name: search, page: 1}));
     
      };     
      
    
  return (
    <form onSubmit={handleSubmit} >
      <input type="text" placeholder="Search..." value= {search} onChange={handleChange}/>
    
      <button type="submit">
        Search
      </button>
    </form>
  );
};
export default SearchBar;