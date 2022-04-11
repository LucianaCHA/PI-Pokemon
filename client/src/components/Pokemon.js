import React from "react";
import styles from "./Pokemon.module.css";
export function Pokemon({id, name, image, types})
{
  
  return (
    <div className={styles.container}>
    <div className={styles.card}key={id}>
      
      <img
      className= {styles.image}
        src={image}
        alt={name}
        border="1px solid #ddd"
        radius="45px"
        padding="4px"
        width="250em"
        height="250em"
      />
      <div className ={styles.info}>
    <h3>
        {name}
      </h3>
      {types?.map((type) => {
        return (
          <button  className ={styles.btn} key={type}>
            {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
          </button>
         
        );
      })}
      </div>
    </div>
    </div>
  );
  
}
