import React from "react";
import { Link } from "react-router-dom";

export const AdminNavigation = () => {

    return (
        <>
            <li className="nav__item">
                <Link to='/addUser' className="nav__link nav__link--white">Добавить пользователя</Link>
            </li>
            <li className="nav__item">
                <Link to='/addCar' className="nav__link nav__link--white">Добавить автомобиль</Link>
            </li>
        </>
    );
}