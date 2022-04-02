import React from "react";
import { useEffect } from "react";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";

import { getAllData } from "../actions";

export default function LandingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);

  return (
    <React.Fragment>
      <h1>Welcome to Henry Pokemon</h1>
      <Link to="/home">GO!</Link>
    </React.Fragment>
  );
}
