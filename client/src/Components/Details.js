import React from 'react';
import jsonData from '../pred_explain.json';

function Details() {

    let jsonString = JSON.stringify(jsonData, null, 2);
    let jsonParse = JSON.parse(jsonString);
    // const {query, question, sql} = jsonParse 
    const rows = [];
  
    for (let index = 0; index < jsonParse.length; index++) {
      rows.push(<p><b>{index + 1}</b></p>);
      // rows.push(<p>Query : {jsonParse[index]['links']}</p>);
      for (let j = 0; j < jsonParse[index]['links'].length; j++) {
        if (jsonParse[index]['links'][j][2] != null) {
          rows.push(<p>{jsonParse[index]['links'][j][0]} -> {jsonParse[index]['links'][j][2][1]}</p>);
        }
      }
      // rows.push(<p>Query : {jsonParse[index]['query']}</p>);
      rows.push(<p key={index}>Question : {jsonParse[index]['question']}</p>);
      rows.push(<p key={index}>SQL : {jsonParse[index]['sql']}<br></br><hr></hr></p>);
    }  

  return (
    <div>
      <h3>Table Schema Linking</h3>
      <pre>{rows}</pre>
    </div>
  );
}

export default Details;
