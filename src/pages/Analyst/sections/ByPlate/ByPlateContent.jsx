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
        plate,
        status
    } = useByPlate();

    useEffect(() => {
        console.log('getPlateList')
        getPlateList();
    }, [getPlateList]);

    return (
        <div className="byPlate section container">
            <span className="byPlate__title admin__title--section title title--medium">
                Отчет о въездах и выездах на основе автомобильного номера
            </span>
            <Select className="byPlate__select select"
                onChange={(e) => getinOutData(e)}
                options={plateList}
                placeholder='Номер и регион'
                noOptionsMessage={() => 'Номер не найден'}
            />
            {
                inOutData?.length !== 0 &&
                <>
                    <SortableExportTable
                        headers={
                            [['Дата', 'date'],
                            ['Время въезда', 'arrival_time'],
                            ['Время выезда', 'departure_time']]
                        }
                        data={inOutData}
                        fileName={'Все въезды и выезды автомобиля ' + plate.label + ' на ' + new Date().toLocaleDateString()}
                    />
                </>
            }
            {status !== '' && <span className="byPlate__title admin__title--section title title--small">{status}</span>}
        </div>
    )
}