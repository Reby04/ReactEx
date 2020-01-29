import React, { useRef, useState } from "react";

import { ListBiglietti } from "./lista_biglietti";

function App() {
  const counter = useRef(2);
  const inputRef = useRef();
  const editId = useRef(0);

  const [list, setList] = useState([
    { id: 1, numbers: [1, 2, 3, 4, 5] },
    { id: 2, numbers: [6, 7, 8, 9, 10] }
  ]);

  const [candy, setCandy] = useState ([{name:'Menta'}, {name:'Lampone'}]);

  const [bool, setBool] = useState(false);
  const estrazione = [1, 2, 3, 10];

  const premi = {
    1: 10,
    2: 100,
    3: 1000
  };

  const risultati = {};

  list.forEach(item => {
    item.numbers.forEach(num => {
      const included = estrazione.includes(num);

      if (included) {
        const count = risultati[item.id] || 0;
        risultati[item.id] = count + 1;
      }
    });
  });

  const showCandy = id => {
    let newList = [...list];
    console.log(newList);
   
    const names = newList.map(item => item.names);
    newList = names;
    setCandy(newList);
    
    }

  const addBiglietto = () => {
    counter.current = counter.current + 1;
    const id = counter.current;

    setList(list => [...list, { id: id, numbers: [inputRef.current.value.split(",")]}]);
  };

  const removeBiglietto = id => {
    let newList = [...list];

    const index = newList.findIndex(item => item.id == id);

    if (index > -1) {
      newList.splice(index, 1);

      setList(newList);
    }
  };

  const updateBiglietto = () => {
    let newList = [...list];
    console.log(newList);

    const indexList = newList.findIndex(index => index.id === editId.current);
    console.log(indexList);
    newList[indexList].numbers = [inputRef.current.value.split(",")];
    console.log(inputRef.current.value);
    
    setList(newList);

    setBool(false);
  };

  const editBiglietto = id => {
    let newList = [...list];

    const object = newList.find(cicle => cicle.id === id);
    inputRef.current.value = object.numbers;
    console.log(object);
    setBool(true);
    editId.current = id;
    };

  return (
    <div className="App">
      <ListBiglietti
        biglietti={list}
        onRemove={removeBiglietto}
        onEdit={editBiglietto}
      />

      <input ref={inputRef}/>
      {!bool && <button onClick={addBiglietto}>add</button>}
      {bool && <button onClick={updateBiglietto}>save</button>}
      <div>
        {Object.entries(risultati).map(([k, v]) => (
          <div key={k}>
            {k}: {premi[v]}
          </div>
        ))}
      </div>
      <button onClick={showCandy}>show</button>
     
    </div>
  );
}

export default App;
