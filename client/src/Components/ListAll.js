import React, {Fragment, useState} from "react";

const ListAll = () =>{

    const [data, setData] = useState([]);

    const getData = async () => {
        try {
            console.log("hello");

            const response = await fetch("http://localhost:5000/databases");

            console.log(response);
            const jsonData = await response.json();

            console.log(jsonData);
            
            // setData(jsonData);

            
        } catch (error) {
            console.error(error.message);
        }
    }


    const example = () => {
        console.log(data," " , data[0]);
    }

    return(
        <Fragment>
            <button onClick = {getData}>
                Databases
            </button>
            {<div className="display-data">
                {data[0]}
            </div>}
        </Fragment> 
    )
}

export default ListAll;