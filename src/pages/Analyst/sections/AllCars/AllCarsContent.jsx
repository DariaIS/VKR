import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import { SortableExportTable } from '../../../../components/SortableExportTable';

export const AllCarsContent = () => {

    const [table, setTable] = useState([]);

    useEffect(() => {
        console.log('car')
        Axios.get('http://localhost:3001/allCars').then((response) => {
            if (response.data.result) {
                console.log('Axios')
                setTable(response.data.result);
            }
        });
    }, []);

    return (
        <div className="allCars section container">
            {console.log(table)}
            {
                table?.length !== 0 &&
                <div className="table">
                    <span className="table__title title title--medium">Все автомобили с правом доступа</span>
                    <span className="table__title title title--medium">Количество автомобилей  - {table?.length}</span>
                    <SortableExportTable
                        headers={
                            [['Номер автомобиля', 'license_plate'],
                            ['Марка', 'car_brand'],
                            ['ФИО владельца', 'name'],
                            ['Дата предоставления доступа', 'start_date'],
                            ['Дата истечения прав доступа', 'expiration_date']]
                        }
                        data={table}
                        fileName={'Все автомобили с правом доступа на ' + new Date().toLocaleDateString()}
                        count={'Количество автомобилей - ' + table?.length}
                    />
                </div>
            }
        </div>
    )
}