import React from "react";

export function Pokemon({attack,
back,
defense,
front,
height,
hp,
id,
name,
speed,
types,
weight,
art }){

  return (
    <div key = {id}>      
      {types}
      <img src = {art} alt = {name} border= '1px solid #ddd' radius=' 4px' padding= '4px' width='250em' height='250em'/>;
      {/* <NavLink to ={`/videogames/${id}`}><h3>{name}</h3></NavLink> */}
      {console.log(id)}
     <h3>{name}</h3>
    </div>
  );
}