import React from 'react';
import HomeContent from './HomeContent';
import Details from './Details';

function Home() {

    const doReset = () => {
        window.location.href = '/';
    };

    return (
    <div className="d-flex flex-column">
        <nav className="navbar navbar-expand-lg navbar-dark bg-success p-2">
            <span className="navbar-brand">Model Explainability</span>
            <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a class="nav-link" href='/'>Home</a>
                    </li>
                    <li className="nav-item active">
                        <a class="nav-link" href='/schema-link'>Schema Linking</a>
                    </li>
                </ul>
                <button type="button" className="btn btn-outline-danger btn-sm" onClick={doReset}>Reset</button> 
            </div>
        </nav>
        {window.location.pathname === '/' && <HomeContent/>}
        {window.location.pathname === '/schema-link' && <Details/>}
    </div>
    );
}

export default Home;
