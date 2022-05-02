import React from "react";

export const AdminNavigation = () => {

    return (
        <>
            <li className="nav__item">
                <a href="/addUser" className="nav__link nav__link--white">Добавить пользователя</a>
            </li>
            <li className="nav__item">
                <a href="/addCar" className="nav__link nav__link--white">Добавить автомобиль</a>
            </li>
        </>
    );
}