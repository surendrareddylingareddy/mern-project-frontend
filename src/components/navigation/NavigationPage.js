import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import './NavigationPage.css';

const NavigationPage = () => {

    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('username');
        navigate('/login');
    }

    return (
        <div className="nav-bar d-flex row">
            <div className="col-2">
                <Link to="/home">
                    <button type="button" className="btn border-0">Home</button>
                </Link>
            </div>
            <div className="col-4">
                <Link to="/employee-list">
                    <button type="button" className="btn border-0">Employee List</button>
                </Link>
            </div>
            <div className="col-5">
                <p className='mt-2'>{username}</p>
            </div>
            <div className="col-1">
                    <button type="button" className="btn border-0" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default NavigationPage;