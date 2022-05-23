import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';

import { ReactComponent as CloseMenu } from '../assets/img/icons/closeMenu.svg';
import { ReactComponent as OpenMenu } from '../assets/img/icons/openMenu.svg';


export const Header = ({ children, isSecurity }) => {

    const [isOpen, setIsOpen] = useState(false);


    const logOut = () => {
        Axios.get('http://localhost:3001/logout');
    };

    return (
        <header className="header">
            {console.log(isSecurity)}
            {!isSecurity && <div className={`overflow ${isOpen ? `overflow--visible` : ``}`} onClick={() => setIsOpen(false)}></div>}
            <div className="header__content container">
                <h1 className="header__logo">
                    <Link className="header__logo-link" to='/home'>
                        <span>Пропускная</span>
                        <span>система</span>
                    </Link>
                </h1>
                <div className="header__nav">
                    {!isSecurity && <OpenMenu className="header__open-nav" onClick={() => setIsOpen(true)} />}
                    <nav className={`nav ${!isSecurity ? `nav--responsive` : ``} ${isOpen ? `nav--active` : ``}`}>
                        <ul className={`nav__list ${!isSecurity ? `nav__list--responsive` : ``}`}>
                            {!isSecurity &&
                                <li className="nav__item nav__item--close">
                                    <CloseMenu className="nav__close-icon" onClick={() => setIsOpen(false)} />
                                </li>
                            }
                            {children}
                            <li className="nav__item nav__item--logout">
                                <Link to='/' className="nav__link nav__link--blue nav__link--logout" onClick={logOut}>Выйти</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;