import React, { useState } from 'react';
import HomeContent from './HomeContent';
import Details from './Details';

function Home() {
    const [currentPage, setCurrentPage] = useState('/');

    const changePath = (page) => {
        setCurrentPage(page);
        console.log(currentPage)
    };

    return (
    <div className="d-flex flex-column">
        <nav className="navbar navbar-expand-lg navbar-dark bg-success p-2">
            <span className="navbar-brand">Model Explainability</span>
            <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <button className="nav-link" onClick={() => changePath('/')}>Home</button>
                    </li>
                    <li className="nav-item active">
                        <button className="nav-link" onClick={() => changePath('/schema-link')}>Schema Linking</button>
                    </li>
                </ul>
                <button type="button" className="btn btn-outline-danger btn-sm" onClick={() =>  window.location.href = '/'}>Reset</button> 
            </div>
        </nav>
        {currentPage === '/schema-link' ? <Details/> : <HomeContent/>}
    </div>
    );
}

export default Home;
