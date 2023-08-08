import React, { Fragment, useState } from "react";
import Tables from "./Tables";

const ListAllTables = () => {
  const [tables, setTables] = useState([]);

  const getTables = async () => {
    try {
      const response = await fetch("http://localhost:5000/databases/tables");
      const jsonData = await response.json();

      setTables(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      {<button onClick={getTables}>Tables</button>}
      {tables.map((table) => (
        <Tables name={table.table_name} key={table.table_name} />
      ))}
    </Fragment>
  );
};

export default ListAllTables;
