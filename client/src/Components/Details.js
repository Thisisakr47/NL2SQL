import React from 'react';
import jsonData from '../pred_explain.json';

function Details() {

    let jsonString = JSON.stringify(jsonData, null, 2);
    let jsonParse = JSON.parse(jsonString);
    const row = [];
    
    for (let index = 0; index < jsonParse.length; index++) {
      const col = [];
      for (let j = 0; j < jsonParse[index]['links'].length; j++) {
        if (jsonParse[index]['links'][j][2] != null) {
          col.push(<div className='d-flex flex-column p-4'><div className='text-center'>{jsonParse[index]['links'][j][0]}</div><div className='text-center'>{jsonParse[index]['links'][j][2][1]}</div></div>);
        }
      }
      row.push(<div className='d-flex mb-3'>{col}</div>)
      row.push(<p><br></br>Query : {jsonParse[index]['query']}</p>);
      row.push(<p key={index}>Question : {jsonParse[index]['question']}</p>);
      row.push(<p key={index}>Predicted SQL : {jsonParse[index]['sql']}<br></br><hr></hr></p>);
    }  

  return (
    <div className='d-flex flex-column m-3'>
      <pre>{row}</pre>
    </div>
  );
}

export default Details;
