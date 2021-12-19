import React from "react";
import Axios from 'axios';

function Header() {

    const logOut = () => {
        Axios.get('http://localhost:3001/logout').then((response) => {
            console.log(response);
        });
    };

    return (
        <header className="header">
            <div className="header__content container">
                <h1 className="header__logo">
                    <a className="header__logo-link" href="/home">
                        <span>Пропускная</span>
                        <span>система</span>
                    </a>
                </h1>
                <div className="header__nav">
                    <nav className="nav">
                        <ul className="nav__list">
                            <li className="nav__item">
                                <a href="/home" className="nav__link">Поддержка </a>
                            </li>
                            <li className="nav__item">
                                <a href="/home" className="nav__link">Контакты</a>
                            </li>
                            <li className="nav__item">
                                <a href="/" className="nav__link" onClick={logOut}>Выйти</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;