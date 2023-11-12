import React, {useState} from 'react';
import jsonData from '../pred_explain.json';

function Query() {
    
    const [currentPage, setCurrentPage] = useState('No Input');
    const [inputValue, setInputValue] = useState('');

    let jsonString = JSON.stringify(jsonData, null, 2);
    let jsonParse = JSON.parse(jsonString);
    
    const changePage = (page) => {
        setCurrentPage(page);
    };

    const submitHandler = (event) => {
        let flag = 0;
        for (let index = 0; index < jsonParse.length; index++) {
            if(jsonParse[index]['question'] === event) {
                changePage(jsonParse[index]['sql']);
                console.log(event)
                flag = 1;
                break;
            }
        }
        if(flag !== 1) {
            changePage('NOT FOUND');
        }
    };

    return (
        <div className="d-flex flex-column p-5">
            <div className="d-flex p-2">
                <input
                    className="form-control p-1"
                    type="text"
                    placeholder="Ask Question"
                    aria-label="Search"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                    className="btn btn-outline-success btn-sm mx-3"
                    type="submit"
                    onClick={() => submitHandler(inputValue)}>
                    Generate SQL
                </button>
            </div>
            <div className='p-2 mt-3'>
                <b>SQL Query : {currentPage}</b>
            </div>
        </div>
    );
}

export default Query;
