import React from "react";
import { Button } from 'antd';

export const ListBiglietti = ({ biglietti, onRemove, onEdit}) => {
  return (
    <ul>
      {biglietti.map(item => (
        <li key={item.id}>
          {item.numbers.join(",")}{" "}
          <Button type="danger" onClick={() => onRemove(item.id)}>X</Button>
          <Button type="primary" onClick={() => onEdit(item.id)}>edit</Button>
        </li>
      ))}
    </ul>
  );
};
