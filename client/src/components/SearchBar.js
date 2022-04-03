import React from "react";
import {useSelector} from 'react-redux'

import {useHistory, generatePath} from "react-router-dom";

import { useDispatch } from "react-redux";

import { setName } from "../actions";

const SearchBar = () => {
const [search, setSearch] = React.useState('');

const dispatch = useDispatch();
const toRoute = useHistory();

const allPokemons = useSelector((state) => state.allPokemons);

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
  
      // const handleOnClick = () => {
      //   let id = allPokemons[0].id;
      //   toRoute.push(generatePath("/home/:id", { id }));
      //   console.log('HISTORY', toRoute);
      // }
      
    
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