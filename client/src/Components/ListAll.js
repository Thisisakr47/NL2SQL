import React, { Fragment, useState } from "react";
import Database from "./Database.js";

const ListAll = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5000/databases");
      const jsonData = await response.json();

      setData(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <button onClick={getData}>Databases</button>
      {data.map((element) => (
        <Database name={element.datname} key={element.datname} />
      ))}
    </Fragment>
  );
};

export default ListAll;
