import React from "react";
import { Link } from "react-router-dom";

export const AnalystNavigation = () => {

    return (
        <>
            <li className="nav__item">
                <Link to='/byPerson' className="nav__link nav__link--white">Перемещения на основе владельца</Link>
            </li>
            <li className="nav__item">
                <Link to='/byPlate' className="nav__link nav__link--white">Перемещения на основе номера машины</Link>
            </li>
            <li className="nav__item">
                <Link to='/byDate' className="nav__link nav__link--white">Статистика по дате</Link>
            </li>
            <li className="nav__item">
                <Link to='/allCars' className="nav__link nav__link--white">Все записи</Link>
            </li>
        </>
    );
}