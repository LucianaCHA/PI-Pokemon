import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { useEffect } from "react";

import { getPokeTypes, postPokemon } from "../actions";
// import { validate } from "./validations";

export function CreatePokemon() {
  const dispatch = useDispatch();

  const goBack = useHistory();

  const poketypes = useSelector((state) => state.poketypes);

    useEffect(() => {
    dispatch(getPokeTypes());
  }, [dispatch]);


  const [pokemon, setPokemon] = React.useState({
    name: "",
    types: [],
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    image: "",
    weight: "",
    height: "",
  });

  const [error, setError] = React.useState({});

  const [isValid, setIsValid] = React.useState(false);

  const goBackToHome = () => {
    goBack.goBack();
  };


  // useEffect(() => {
  //   setError(validate(pokemon));
   
  // }, [pokemon]);

  const handleChange = (e) => {
    e.preventDefault(); 

    setPokemon({
      ...pokemon,
      [e.target.name]: e.target.value,
    });

    // setError(
    //   validate({
    //     ...pokemon,
    //     [e.target.name]: e.target.value,
    //   })
    // );

   
  };

  const handleSelect = (t) => {
    t.preventDefault();
    if(!pokemon.types.includes(t.target.value)){
      setPokemon({
        ...pokemon, 
        types: [...pokemon.types, t.target.value]
      })
    }else{
      setPokemon({
        ...pokemon, 
        types: pokemon.types.filter(e => e !== t.target.value)
      })
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  //   setIsValid(Object.keys(error).length === 0);
    
    // if (isValid) {
    //   dispatch(postPokemon(pokemon));
    //   goBackToHome();
    // }

    dispatch(postPokemon(pokemon));
      goBackToHome();
      console.log(pokemon, 'objeto creado en componente')
      alert('Pokemon created :) ')
  };

  return (
    <>
      <button onClick={goBackToHome}>
         <h1>🔙</h1>⏪
      </button>

      <div>
        <h1>Create your very own Pokemon!</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
         <label>Name</label>

       <input
            type="text"
            name="name"
            placeholder="name"
            onChange={handleChange}
            value={pokemon.name}
          />
          {/* {error.name ? <p>{error.name}</p> : null} */}

          <ul>Stats</ul>
          <input 
            type="number"
            name="hp"
            placeholder="HP"
            onChange={handleChange}
            value={pokemon.hp}
          />
          {/* {error.hp ? <p>{error.hp}</p> : null} */}
          <input
            type="number"
            placeholder="attack"
            name= "attack"
            onChange={handleChange}
            value={pokemon.attack}
          />
          {/* {error.attack ? <p>{error.hp}</p> : null} */}
          <input
            type="number"
            name="defense"
            placeholder="Defense"
            onChange={handleChange}
            value={pokemon.defense}
          />
          {/* {error.defense ? <p>{error.defense}</p> : null} */}
          <input
            type="number"
            name="speed"
            placeholder="speed"
            onChange={handleChange}
            value={pokemon.speed}
          />
          {/* {error.speed ? <p>{error.speed}</p> : null} */}

          <ul>Others</ul>
          <input
            type="number"
            name="weight"
            placeholder="Weight"
            onChange={handleChange}
            value={pokemon.weight}
          />
          {/* {error.weight ? <p>{error.weight}</p> : null} */}
          <input
            type="number"
            name="height"
            placeholder="Height "
            onChange={handleChange}
            value={pokemon.height}
          />

{/* {error.weight ? <p>{error.weight}</p> : null} */}


          {/* <input
            type="text"
            name="image"
            placeholder="Image"
            onChange={handleChange}
            value={pokemon.image}
          /> */}
          {/* {error.image ? <p>{error.image}</p> : null} */}

          <div>
            <ul>Select types</ul>

            {poketypes?.map((type) => {
              return (
                <div key={type.id}>
                  <label>
                    {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                  </label>
                  <input
                    type="checkbox"
                    name="name"
                    value={type.name}
                    onChange={(e) => handleSelect(e)}
                  />
                </div>
              );
            })}
            {/* {error.types ? <p>{error.types}</p> : null} */}
          </div>
        </div>
        {console.log(pokemon)}
        <input  type="submit" value="Create" />
      </form>
    </>
  );
}
