import React from "react";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getPokeTypes, postPokemon } from "../actions";
// import { validate } from "./validations";
import styles from "./CreatePokemon.module.css";

export function CreatePokemon() {
  const image = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.aGihiAJdXHQUE3L2c6O9IgHaHa%26pid%3DApi&f=1';

  const dispatch = useDispatch();
  const seeAll = useHistory();

  useEffect(() => {
    dispatch(getPokeTypes());
  }, [dispatch]);

  const poketypes = useSelector((state) => state.poketypes);

  function validate(pokemon) {
    let error = {};

    if (!pokemon.name) {
      error.name = "Your pokemon needs a name!";
    }
    if (!/^[a-zA-z]*[a-zA-Z\\-_@&$%#\s]{3,18}$/.test(pokemon.name)) {
      error.name = "Name must be at least 3 alphabetical characters";
    }
    if (pokemon.hp !== "" && pokemon.hp < 1) {
      error.hp = "HP must be greater than 1 or leave it empty and toss a coin!";
    }
    if (pokemon.hp !== "" && pokemon.hp > 151) {
      error.hp = "HP must be less than 100 or leave it empty and toss a coin!";
    }
    if (pokemon.attack !== "" && pokemon.attack < 1) {
      error.attack =
        "Attack must be greater than 1 or leave it empty and toss a coin!";
    }
    if (pokemon.attack !== "" && pokemon.attack > 151) {
      error.attack =
        "Attack must be less than 150 or leave it empty and toss a coin!";
    }
    if (pokemon.defense !== "" && pokemon.defense < 1) {
      error.defense =
        "Defense must be greater than 1 or leave it empty and toss a coin!";
    }
    if (pokemon.defense !== "" && pokemon.defense > 151) {
      error.defense =
        "Defense must be less than 150 or leave it empty and toss a coin!";
    }
    if (pokemon.speed !== "" && pokemon.speed < 1) {
      error.speed =
        "HP must be greater than 1 or leave it empty and toss a coin!";
    }
    if (pokemon.speed !== "" && pokemon.speed > 151) {
      error.speed =
        "HP must be less than 150 or leave it empty and toss a coin!";
    }
    if (pokemon.weight !== "" && pokemon.weight < 0.01) {
      error.weight =
        "Weight must be greater than 0.01 kg or leave it empty and toss a coin!";
    }
    if (pokemon.weight !== "" && pokemon.weight > 1000) {
      error.weight =
        "Weight must be less than 999 kg or leave it empty and toss a coin!";
    }
    if (pokemon.height !== "" && pokemon.height < 0.1) {
      error.height =
        "Height must be greater than 10 cm or leave it empty and toss a coin!";
    }
    if (pokemon.height !== "" && pokemon.height > 20) {
      error.height =
        "Height must be less than 20 m or leave it empty and toss a coin!";
    }
    if (
      pokemon.image !== "" &&
      !/https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/.test(pokemon.image)
    ) {
      error.image = "Image must be a valid URL";
    }

    if (pokemon.types.length > 2) {
      error.types = "You can only select 2 types";
    }
    console.log(error, "objeto en validate functions");
    return error;
  }

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

  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const allAtHome = () => {
    seeAll.push('/home');
  };

  useEffect(() => {
    setErrors(validate(pokemon));
    setIsValid(Object.keys(validate(pokemon)).length === 0);
  }, [pokemon]);

  const handleChange = (e) => {
    e.preventDefault();

    setPokemon({
      ...pokemon,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...pokemon,
        [e.target.name]: e.target.value,
      })
    );
    setIsValid(Object.keys(errors).length === 0);
  };

  const handleSelect = (t) => {
    t.preventDefault();
    if (!pokemon.types.includes(t.target.value)) {
      setPokemon({
        ...pokemon,
        types: [...pokemon.types, t.target.value],
      });
    } else {
      setPokemon({
        ...pokemon,
        types: pokemon.types.filter((e) => e !== t.target.value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   if (pokemon.image === "") {pokemon.image = image;}
    dispatch(postPokemon(pokemon));

    alert(`${pokemon.name.toUpperCase()} has been created!, Check it in Home :)`);

    allAtHome();
  };

  return (
    <>
      <button className={styles.btn} onClick={allAtHome}>
        🔙
      </button>

      <div>
        <h1>Create your own Pokemon!</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name </label>

          <input
          autoComplete="off"
            className={styles.input}
            id="nameField"
            type="text"
            name="name"
            placeholder="name"
            onChange={handleChange}
            value={pokemon.name}
          />
          {errors.name ? <p className={styles.error}>{errors.name}</p> : null}
          <div className={styles.fields}>
            <ul>Stats</ul>
            <input
              type="number"
              name="hp"
              placeholder="HP"
              onChange={handleChange}
              value={pokemon.hp}
            />
            {errors.hp ? <p className={styles.error}>{errors.hp}</p> : null}
            <input
              type="number"
              placeholder="attack"
              name="attack"
              onChange={handleChange}
              value={pokemon.attack}
            />
            {errors.attack ? <p className={styles.error}>{errors.attack}</p> : null}
            <input
              type="number"
              name="defense"
              placeholder="Defense"
              onChange={handleChange}
              value={pokemon.defense}
            />
            {errors.defense ? (
              <p className={styles.error}>{errors.defense}</p>
            ) : null}
            <input
              type="number"
              name="speed"
              placeholder="speed"
              onChange={handleChange}
              value={pokemon.speed}
            />
            {errors.speed ? (
              <p className={styles.error}>{errors.speed}</p>
            ) : null}

            <ul>Others</ul>
            <input
              type="number"
              name="weight"
              placeholder="Weight"
              onChange={handleChange}
              value={pokemon.weight}
            />
            {errors.weight ? (
              <p className={styles.error}>{errors.weight}</p>
            ) : null}
            <input
              type="number"
              name="height"
              placeholder="Height "
              onChange={handleChange}
              value={pokemon.height}
            />

            {errors.height ? (
              <p className={styles.error}>{errors.height}</p>
            ) : null}

            <input
              type="text"
              name="image"
              placeholder="Image"
              onChange={handleChange}
              value={pokemon.image}
            />

            {errors.image ? (
              <p className={styles.error}>{errors.image}</p>
            ) : null}
          </div>

          <div>
            <ul>Select types</ul>

            {poketypes?.map((type) => {
              return (
                <div className={styles.check} key={type.id}>
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
            {errors.types ? (
              <p className={styles.error}>{errors.types}</p>
            ) : null}
          </div>
        </div>

        <input className= {styles.btn} disabled={!isValid} type="submit" value="Create!" />
      </form>
    </>
  );
}
