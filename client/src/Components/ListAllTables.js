import React, { Fragment, useState } from "react";
import Tables from "./Tables";

const ListAllTables = () => {
  const [tables, setTables] = useState([]);

  const getTables = async () => {
    try {
      const response = await fetch("https://render-nl2sql.onrender.com/databases/tables");
      const jsonData = await response.json();
      setTables(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      
      {<div className="d-flex justify-content-center"><button className="btn btn-outline-success btn-sm mb-3" onClick={getTables}>Tables</button></div>}
      {tables.map((table) => (
        <Tables name={table.table_name} key={table.table_name} />
      ))}
    </Fragment>
  );
};

export default ListAllTables;
