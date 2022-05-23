import React from "react";
import { useEffect } from "react";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { getAllData } from "../actions";

import imagen from "../assets/bkg2.jpg"; 

import styles from "./LandingPage.module.css";

export default function LandingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllData());
  }, []);

  return (
    <React.Fragment>
    <div className={styles.bkg}>
      <img src={imagen} style= {{
        position:'absolute', filter: 'blur(15px)', zIndex: '-10', margin: '-3% -50%', width: '100vw', height: '100vh', objectFit: 'cover'
      }} alt="imagenpokemon" />
      
      </div>
      
      <Link to="/home"><button className ={styles.go}>GO!</button></Link>
    </React.Fragment>
  );
}
