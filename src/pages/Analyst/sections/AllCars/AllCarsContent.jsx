import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import { SortableExportTable } from '../../../../components/SortableExportTable';

export const AllCarsContent = () => {

    const [cars, setCars] = useState('');

    useEffect(() => {
        console.log('car')
        Axios.get('http://localhost:3001/carTable').then((response) => {
            if (response.data.result)
                setCars(response.data.result);
        });
    }, []);

    return (
        <div className="allCars section container">
            {
                cars?.length !== 0 &&
                <div className="table">
                    <span className="table__title title title--medium">Все машины, присутствующие в базе данных</span>
                    <SortableExportTable
                        headers={
                            [['Номер автомобиля', 'license_plate'],
                            ['Марка', 'car_brand'],
                            ['ФИО владельца', 'name'],
                            ['Дата предоставления доступа', 'start_date'],
                            ['Дата истечения прав доступа', 'expiration_date']]
                        }
                        data={cars}
                        fileName={'Все автомобили на ' + new Date().toLocaleDateString()}
                    />
                </div>
            }
        </div>
    )
}