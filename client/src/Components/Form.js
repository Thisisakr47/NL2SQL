import axios from "axios";
import React, { useState } from "react";

const Form = () => {
  const [enteredInput, setEnteredInput] = useState("");

  const [resultAgainstQuery, setResultAgainstQuery] = useState([]);

  const enteredInputHandler = (event) => {
    setEnteredInput(event.target.value);
    //console.log(enteredInput);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    axios
      .get("https://render-nl2sql.onrender.com/input", {
        params: {
          sendInput: enteredInput,
        },
      })
      .then(function (response) {
        console.log(response.data);
        setResultAgainstQuery(response.data);
      });
  };

  return (
    <div>
      <form className="form-inline d-flex mb-3" onSubmit={submitHandler}>
        <input className="form-control p-1" type="text" placeholder="SQL Query" aria-label="Search" onChange={enteredInputHandler}></input>
        <button className="btn btn-outline-success btn-sm m-2" type="submit">Search</button>
      </form>
      <tbody>
        {resultAgainstQuery.map((item) => (
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
    </div>
  );
};

export default Form;
