import React, { useEffect } from 'react';

import { Header } from '../../components';
import { AdminNavigation } from './AdminNavigation';
import { useAdmin } from './hooks/useAdmin';

export const Admin = () => {

    const {
        getExpiredCars,
        expiredCars,
        updateDate,
        error,
        success
    } = useAdmin();

    useEffect(() => {
        console.log('effect')
        getExpiredCars();
    }, [getExpiredCars]);

    return (
        <>
            <Header>
                <AdminNavigation />
            </Header>
            <div className="admin section container">
                <span className="admin__title title title--large">Вы вошли как администратор</span>
                {expiredCars.length !== 0 &&
                    <div className='admin__expired'>
                        <span className='title title--medium'>
                            Внимание! Cкоро истечет (или недавно истек) срок предоставления доступа для данных автомобилей
                        </span>
                        <table className="table__item">
                            <thead className="table__thead">
                                <tr className="table__tr">
                                    <th className="table__th">
                                        Номер автомобиля
                                    </th>
                                    <th className="table__th">
                                        Марка автомобиля
                                    </th>
                                    <th className="table__th">
                                        Дата истечения прав доступа
                                    </th>
                                    <th className="table__th">
                                        Обновление прав доступа
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="table__tbody">
                                {Object.values(expiredCars).map(val => {
                                    return (
                                        <tr className="table__tr" key={val.id_car}>
                                            <td className="table__td">{val.license_plate}</td>
                                            <td className="table__td">{val.car_brand}</td>
                                            <td className="table__td">{val.expiration_date}</td>
                                            <td className="table__td">
                                                <a href='/home' className='table__link' onClick={(e) => updateDate(e, val.id_car)}>
                                                    Обновить
                                                </a>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        {error !== '' && <span className="status status--warning">{error}</span>}
                        {success !== '' && <span className="status status--success">{success}</span>}
                    </div>
                }
            </div>
        </>
    );
}