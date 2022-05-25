import { useState, useEffect } from 'react';
import Axios from 'axios';

import { SortableExportTable } from '../../../../components/SortableExportTable';

export const ByNow = () => {
    const [table, setTable] = useState([]);

    useEffect(() => {
        // console.log('getByNowEffect');
        Axios.get('http://localhost:3001/byNow')
            .then((response) => {
                // console.log('getByNow');
                setTable(response.data.result);
                // console.log(response);
            });
    }, []);

    return (
        <>
            <span className="byNow__title title title--small">Количество автомобилей на территории - {table?.length}</span>
            {table?.length !== 0 &&
                <SortableExportTable
                    headers={
                        [['Номер автомобиля', 'license_plate'],
                        ['Марка', 'car_brand'],
                        ['Время въезда', 'arrival_time']]
                    }
                    data={table}
                    fileName={'Автомобили на территории на ' + new Date().toLocaleDateString() + ' ' + new Date().getHours() + ":" + new Date().getMinutes()}
                    count={'Количество автомобилей на территории- ' + table?.length}
                />}
        </>
    )
}