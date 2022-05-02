import React from "react";

export const AnalystNavigation = () => {

    return (
        <>
            <li className="nav__item">
                <a href="/byDate" className="nav__link nav__link--white">Статистика по дате</a>
            </li>
            <li className="nav__item">
                <a href="/home" className="nav__link nav__link--white">Все записи</a>
            </li>
        </>
    );
}