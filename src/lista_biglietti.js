import React from "react";

export const ListBiglietti = ({ biglietti, onRemove, onEdit}) => {
  return (
    <ul>
      {biglietti.map(item => (
        <li key={item.id}>
          {item.numbers.join(",")}{" "}
          <button onClick={() => onRemove(item.id)}>X</button>
          <button onClick={() => onEdit(item.id)}>edit</button>
        </li>
      ))}
    </ul>
  );
};
