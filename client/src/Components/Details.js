import React from 'react';
import jsonData from '../pred_explain.json';

function Details() {

    let jsonString = JSON.stringify(jsonData, null, 2);
    let jsonParse = JSON.parse(jsonString);
    const row = [];
    
    for (let index = 0; index < jsonParse.length; index++) {
      const col = [];
      col.push(<div className='d-flex flex-column p-4'><div className='p-2'><b>Input_Column</b></div><div className='font-weight-bold p-2'><b>LinkedColumn</b></div></div>);
      for (let j = 0; j < jsonParse[index]['links'].length; j++) {
        if (jsonParse[index]['links'][j][2] != null) {
          col.push(<div className='d-flex flex-column p-4'><div className='border border-dark text-center p-2'>{jsonParse[index]['links'][j][0]}</div><div className='border border-dark text-center border-top-0 p-2'>{jsonParse[index]['links'][j][2][1]}</div></div>);
        }
      }
      row.push(<div className='d-flex mb-3'>{col}</div>)
      row.push(<p><b>Question : </b>{jsonParse[index]['question']}</p>);
      // row.push(<p>TrueValue SQL : {jsonParse[index]['query']}</p>);
      row.push(<p><b>Predicted SQL : </b>{jsonParse[index]['sql']}</p>);
      row.push(<hr/>)
    }  

  return (
    <div className='d-flex flex-column m-3'>
      {row}
    </div>
  );
}

export default Details;
