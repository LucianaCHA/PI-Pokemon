import React from "react";

import styles from "./Pagination.module.css";
export const Pagination = ({ page, totalPages, switchPage }) => {
  let numbers = [];

  for (let i = 1; i <= totalPages; i++) {
    numbers.push(i);
  }

  return (
    <div className="pagination">
      {numbers.map((page) => {
        return (
          <button className={styles.btn} key={page} onClick={() => switchPage(page)}>
            {page}
          </button>
        );
      })}
    </div>
  );
};
