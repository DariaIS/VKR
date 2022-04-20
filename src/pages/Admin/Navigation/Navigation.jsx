import React from "react";

export const Navigation = () => {

    return (
        <>
            <li className="nav__item">
                <a href="/home" className="nav__link nav__link--white">Добавить пользователя</a>
            </li>
            <li className="nav__item">
                <a href="/home" className="nav__link nav__link--white">Удалить пользователя</a>
            </li>
            <li className="nav__item">
                <a href="/home" className="nav__link nav__link--white">Добавить автомобиль</a>
            </li>
        </>
    );
}