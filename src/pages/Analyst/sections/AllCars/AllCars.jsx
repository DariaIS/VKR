import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import { Header } from '../../../../components';
import { AnalystNavigation } from '../../AnalystNavigation';

import { ProtectedRoute } from '../../../../components/ProtectedRoute';
import { CarsTable } from './components/CarsTable';

export const AllCars = () => {

    const [cars, setCars] = useState('');

    useEffect(() => {
        let isMounted = true;
        console.log('car')
        Axios.get('http://localhost:3001/carTable').then((response) => {
            if (isMounted)
                setCars(response.data.result);
        });
        return () => isMounted = false
    }, [setCars]);

    return (
        <ProtectedRoute role='analyst' setNewRole={null}>
            <Header>
                <AnalystNavigation />
            </Header>

            <div className="allCars section container">
                {
                    cars &&
                    <div className="table">
                        <span className="table__title title title--medium">Все машины, присутствующие в базе данных</span>
                        <CarsTable
                            headers={
                                [['Номер машины', 'license_plate'],
                                ['Марка машины', 'car_brand'],
                                ['ФИО владельца', 'name'],
                                ['Дата предоставления доступа', 'start_date'],
                                ['Дата истечения прав доступа', 'expiration_date']]
                            }
                            data={cars}
                            setData={setCars} />
                    </div>
                }
            </div>
        </ProtectedRoute>
    )
}