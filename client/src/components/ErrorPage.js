import React from "react";

import styles from './ErrorPage.module.css';

export const ErrorPage = ({ error }) => {

  return (<div className= {styles.error}>{error}</div>)
};
