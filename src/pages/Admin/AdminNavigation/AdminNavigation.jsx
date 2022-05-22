import React from "react";
import { Link } from "react-router-dom";

export const AdminNavigation = () => {

    return (
        <>
            <li className="nav__item">
                <Link to='/addCar' className="nav__link nav__link--white">Добавить автомобиль</Link>
            </li>
            <li className="nav__item">
                <Link to='/changeData' className="nav__link nav__link--white">Просмотр и изменение записи</Link>
            </li>
            <li className="nav__item">
                <Link to='/user' className="nav__link nav__link--white">Добавить и удалить пользователя</Link>
            </li>
            <li className="nav__item">
                <Link to='/addPerson' className="nav__link nav__link--white">Добавить владельца</Link>
            </li>
        </>
    );
}