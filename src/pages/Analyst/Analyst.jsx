import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Analyst() {

    const [carTable, setCarTable] = useState('');

    useEffect(() => {
        Axios.get('http://localhost:3001/cartable').then((response) => {
            // console.log(response.data.result);
            setCarTable(response.data.result);
        });
    }, []);

    return (
        <div className="analyst section container">
            <span className="analyst__title title title--medium">Вы вошли как аналитик</span>
            <div className="analyst__table">
                <span className="analyst__table-title title title--small">Все машины, присутствующие в базе данных</span>
                <table className="analyst__table-item">
                    <thead className="analyst__thead">
                        <tr className="analyst__tr">
                            <th className="analyst__th">Номер машины</th>
                            <th className="analyst__th">Марка машины</th>
                            <th className="analyst__th">Фамилия</th>
                            <th className="analyst__th">Имя</th>
                            <th className="analyst__th">Отчество</th>
                            <th className="analyst__th">Дата предоставления доступа</th>
                            <th className="analyst__th">Дата истечения прав доступа</th>
                        </tr>
                    </thead>
                    <tbody className="analyst__tbody">
                        {
                            Object.values(carTable).map(val => {
                                return (
                                    <tr className="analyst__tr" key={val.id_car}>
                                        <td className="analyst__td">{val.license_plate}</td>
                                        <td className="analyst__td">{val.car_brand}</td>
                                        <td className="analyst__td">{val.last_name}</td>
                                        <td className="analyst__td">{val.name}</td>
                                        <td className="analyst__td">{val.middle_name}</td>
                                        <td className="analyst__td">{val.start_date.toString().split('T')[0]}</td>
                                        <td className="analyst__td">{val.expiration_date.toString().split('T')[0]}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Analyst;