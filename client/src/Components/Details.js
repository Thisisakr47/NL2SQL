import React from 'react';
import jsonData from '../pred_explain.json';

function Details() {

    let jsonString = JSON.stringify(jsonData, null, 2);
    let jsonParse = JSON.parse(jsonString);
    // const {query, question, sql} = jsonParse 
    const rows = [];

    const data = [
      { Name: 'John', Age: 25, City: 'New York' },
      { Name: 'Jane', Age: 30, City: 'London' },
    ];
  
    for (let index = 0; index < jsonParse.length; index++) {
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
    // <div className='d-flex flex-column m-3'>
    //   <pre>{rows}</pre>
    // </div>
    <table border="1">
      <thead>
        <tr>
          {/* Render table headers based on the keys of the first object in the data array */}
          {Object.keys(data[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Render rows based on the data array */}
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {/* Render cells based on the key-value pairs in each row */}
            {Object.entries(row).map(([key, value], colIndex) => (
              <td
                key={colIndex}
                style={{ backgroundColor: value === data[1][key] ? 'green' : 'red' }}
              >
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Details;
