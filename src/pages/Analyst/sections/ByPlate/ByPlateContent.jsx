import React, { useEffect } from 'react';
import Select from 'react-select';

import { SortableExportTable } from '../../../../components/SortableExportTable';

import { useByPlate } from './hooks/useByPlate';

export const ByPlateContent = () => {

    const {
        getPlateList,
        plateList,
        getinOutData,
        inOutData,
        plate
    } = useByPlate();

    useEffect(() => {
        console.log('getPlateList')
        getPlateList();
    }, [getPlateList]);

    return (
        <div className="allCars section container">
            <span className="changeData__title admin__title--section title title--medium">
                Введите номер для формирования отчета о въездах и выездах
            </span>
            <Select className="changeData__select select"
                onChange={(e) => getinOutData(e)}
                options={plateList}
            />
            {
                inOutData?.length !== 0 &&
                <div className="table">
                    <span className="table__title title title--medium">Все машины, присутствующие в базе данных</span>
                    <SortableExportTable
                        headers={
                            [['Дата', 'date'],
                            ['Время въезда', 'arrival_time'],
                            ['Время выезда', 'departure_time']]
                        }
                        data={inOutData}
                        fileName={'Въезды и выезды автомобиля ' + plate.label + new Date().toLocaleDateString()}
                    />
                </div>
            }
        </div>
    )
}