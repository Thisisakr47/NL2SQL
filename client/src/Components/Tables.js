import axios from "axios";
import React, { Fragment, useState } from "react";

const Tables = (props) => {
  const [records, setRecords] = useState([]);

  const clickHandler = async () => {
    try {
      const url = "http://localhost:5000/databases/tables/records";
      const response = await axios.get(url, {
        params: {
          tableName: props.name,
        },
      });

      setRecords(response.data);
      console.log(response.data);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <button onClick={clickHandler}>{props.name}</button>
      <tbody>
        {records.map((item) => (
          <tr key={item.id}>
            <td>{item.first_name}</td>
            <td>{item.last_name}</td>
            <td>{item.gender}</td>
            <td>{item.email}</td>
            <td>{item.phone}</td>
            <td>{item.dept}</td>
          </tr>
        ))}
      </tbody>
    </Fragment>
  );
};

export default Tables;
