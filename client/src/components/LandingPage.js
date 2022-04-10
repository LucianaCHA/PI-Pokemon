import React from "react";
import { useEffect } from "react";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { getAllData } from "../actions";

import styles from "./LandingPage.module.css";

export default function LandingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);

  return (
    <React.Fragment>
    <div className={styles.bkg}>
      <Link to="/home"><button className = {styles.go}>GO!</button></Link>
      </div>
    </React.Fragment>
  );
}
