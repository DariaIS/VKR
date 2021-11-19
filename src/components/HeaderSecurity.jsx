import React from "react";

function HeaderSecurity() {
    return (
        <header className="header">
            <div className="header__content container">
                <h1 className="header__logo">
                    <a className="header__logo-link" href="/">
                        <span>Пропускная</span>
                        <span>система</span>
                    </a>
                </h1>
                <div className="header__nav">
                    <nav className="nav">
                        <ul className="nav__list">
                            <li className="nav__item">
                                <a href="/#" className="nav__link">Экстренное открытие</a>
                            </li>
                            <li className="nav__item">
                                <a href="/#" className="nav__link">Поддержка </a>
                            </li>
                            <li className="nav__item">
                                <a href="/#" className="nav__link">Контакты</a>
                                </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default HeaderSecurity;