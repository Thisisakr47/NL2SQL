import axios from "axios";
import React, {Fragment} from "react";

const Database = (props) =>{
    const names = props.name;

    const clickHandler = async() => {
        try {
            const response = await axios.get("/databases/"+names);
		    console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <Fragment>
             <button className="btn btn-outline-primary btn-sm mt-2" onClick={clickHandler}>
                {props.name}
            </button>
        </Fragment> 
    )
}

export default Database;