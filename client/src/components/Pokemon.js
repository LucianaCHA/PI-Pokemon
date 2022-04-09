import React from "react";

export function Pokemon({id, name, image, types})
{
  return (
    <div key={id}>
      <h3>
        {name}
      </h3>
      <img
        src={image}
        alt={name}
        border="1px solid #ddd"
        radius="45px"
        padding="4px"
        width="250em"
        height="250em"
      />
    
      {types?.map((type) => {
        return (
          <li key={type}>
            {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()}
          </li>
        );
      })}
    </div>
  );
}
