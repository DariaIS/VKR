import React from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';

export const Header = ({ children }) => {

    const logOut = () => {
        Axios.get('http://localhost:3001/logout').then((response) => {
            console.log(response);
        });
    };

    return (
        <header className="header">
            <div className="header__content container">
                <h1 className="header__logo">
                    <Link className="header__logo-link" to='/home'>
                        <span>Пропускная</span>
                        <span>система</span>
                    </Link>
                </h1>
                <div className="header__nav">
                    <nav className="nav">
                        <ul className="nav__list">
                            {children}
                            <li className="nav__item">
                                <Link to='/' className="nav__link nav__link--blue" onClick={logOut}>Выйти</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;