import React from "react";
import { useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { ErrorPage } from "./ErrorPage";
import { getById, clean} from "../actions/index.js";

import errorIMG from "../assets/E404.png";
import errorUUID from "../assets/E400ID.png";
import styles from "./PokemonDetail.module.css";

export function PokemonDetail(props) {
  const id = props.match.params.id;

  const dispatch = useDispatch();
  const back = useHistory();

  useEffect(() => {
    dispatch(clean());
    dispatch(getById(id));
  }, [id]);

  const selectedPokemon = useSelector((state) => state.selectedPokemon);

  const goToBack = () => {
    back.goBack();
  };

  // const handleDelete = (e) => {
  //   dispatch(deletePokemon(e.target.value));

  //   alert(`Selected pokemon should been deleted, Check it in Home :)`);

  //   dispatch(allData())
  //   back.push('/home');
  // };

  return selectedPokemon === "Not Found" ? (
    <ErrorPage error={<img src={errorIMG} alt="Not found" />} />
  ) : selectedPokemon === "Invalid ID" ? (
    <ErrorPage error={<img src={errorUUID} alt="Invalid Id" />} />
  ) : (
    <>
      <button className={styles.btn} onClick={goToBack}>
        🔙
      </button>

      <div className={styles.container}>
        {/* <button hidden={!(isNaN(selectedPokemon.id))} className={styles.btnDelete} onClick={handleDelete} value={id}>X</button> */}
        <div className={styles.card}>
          <h1 className={styles.name}> {selectedPokemon.name}</h1>
          <div className={styles.image}>
            <img
              className={styles.img}
              src={selectedPokemon.image}
              alt={selectedPokemon.name}
            />
            <p className={styles.id}>#{selectedPokemon.id}</p>
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.stats}>
            <ul>
              <li>HP: {selectedPokemon.hp}</li>
              <li>Attack: {selectedPokemon.attack}</li>
              <li>Defense: {selectedPokemon.defense}</li>
              <li>Speed: {selectedPokemon.speed}</li>
              <li>Weight: {selectedPokemon.weight}</li>
              <li>Height: {selectedPokemon.height}</li>
            </ul>
          </div>

          <div className={styles.types}>
            <ul>
              {selectedPokemon?.types?.map((type) => {
                return (
                  <li key={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
