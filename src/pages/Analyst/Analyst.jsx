import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import 'react-calendar/dist/Calendar.css';

import { Header } from '../../components';
import { AnalystNavigation } from './AnalystNavigation/AnalystNavigation';

export const Analyst = () => {

    const [carTable, setCarTable] = useState('');

    useEffect(() => {
        Axios.get('http://localhost:3001/carTable').then((response) => {
            // console.log(response.data.result);
            setCarTable(response.data.result);
        });
    }, []);

    return (
        <>
            <Header>
                <AnalystNavigation/>
            </Header>
            <div className="analyst section container">
                <span className="analyst__title title title--large">Вы вошли как аналитик</span>
                <div className="table">
                    <span className="table__title title title--medium">Все машины, присутствующие в базе данных</span>
                    <table className="table__item">
                        <thead className="table__thead">
                            <tr className="table__tr">
                                <th className="table__th">Номер машины</th>
                                <th className="table__th">Марка машины</th>
                                <th className="table__th">Фамилия</th>
                                <th className="table__th">Имя</th>
                                <th className="table__th">Отчество</th>
                                <th className="table__th">Дата предоставления доступа</th>
                                <th className="table__th">Дата истечения прав доступа</th>
                            </tr>
                        </thead>
                        <tbody className="table__tbody">
                            {
                                Object.values(carTable).map(val => {
                                    return (
                                        <tr className="table__tr" key={val.id_car}>
                                            <td className="table__td">{val.license_plate}</td>
                                            <td className="table__td">{val.car_brand}</td>
                                            <td className="table__td">{val.last_name}</td>
                                            <td className="table__td">{val.name}</td>
                                            <td className="table__td">{val.middle_name}</td>
                                            <td className="table__td">{new Date(val.start_date).toLocaleDateString()}</td>
                                            <td className="table__td">{new Date(val.expiration_date).toLocaleDateString()}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
        </div>
        </>

    );
}