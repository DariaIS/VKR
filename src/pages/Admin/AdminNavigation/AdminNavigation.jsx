import React from "react";
import { Link } from "react-router-dom";

export const AdminNavigation = () => {

    return (
        <>
            <li className="nav__item">
                <Link to='/addUser' className="nav__link nav__link--white">Добавление пользователя</Link>
            </li>
            <li className="nav__item">
                <Link to='/addCar' className="nav__link nav__link--white">Добавление автомобиля</Link>
            </li>
            <li className="nav__item">
                <Link to='/changeData' className="nav__link nav__link--white">Просмотр и изменение записи</Link>
            </li>
        </>
    );
}