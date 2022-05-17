import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import { CarsTable } from './components/CarsTable';

export const AllCarsContent = () => {

    const [cars, setCars] = useState('');

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            console.log('car')
            Axios.get('http://localhost:3001/carTable').then((response) => {
                if (response.data.result)
                    setCars(response.data.result);
            });
        }
        return () => isMounted = false
    }, []);

    return (
        <div className="allCars section container">
            {
                cars &&
                <div className="table">
                    <span className="table__title title title--medium">Все машины, присутствующие в базе данных</span>
                    <CarsTable
                        headers={
                            [['Номер машины', 'license_plate'],
                            ['Марка', 'car_brand'],
                            ['ФИО владельца', 'name'],
                            ['Дата предоставления доступа', 'start_date'],
                            ['Дата истечения прав доступа', 'expiration_date']]
                        }
                        data={cars}
                        setData={setCars} />
                </div>
            }
        </div>
    )
}