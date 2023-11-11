import React from 'react';
import Form from './Form';
import ListAll from "./ListAll";
import ListAllTables from './ListAllTables';

function HomeContent() {

    return (
    <div className="d-flex flex-column">
        <div className="d-flex flex-row m-3 justify-content-around">
            <div className="d-flex flex-column">
                <ListAllTables/>
            </div>
            <div className="d-flex flex-column">
                <ListAll/>
            </div>
            <div className="d-flex flex-column">
                <Form/>
            </div>
        </div>
    </div>
    );
}

export default HomeContent;
