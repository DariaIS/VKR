import React, { useEffect } from 'react';
import Select from 'react-select';

import { SortableExportTable } from '../../../../components/SortableExportTable';

import { useByPerson } from './hooks/useByPerson';

export const ByPersonContent = () => {

    const {
        getPersonList,
        personList,
        getinOutData,
        inOutData,
        person,
        status
    } = useByPerson();

    useEffect(() => {
        console.log('getPersonList')
        getPersonList();
    }, [getPersonList]);

    return (
        <div className="byPerson section container">
            <span className="byPerson__title admin__title--section title title--medium">
                Отчет о въездах и выездах автомобиля на основе владельца
            </span>
            <Select className="byPerson__select select select--medium select--margin"
                onChange={(e) => getinOutData(e)}
                options={personList}
                placeholder='Владелец'
                noOptionsMessage={() => 'Владелец не найден'}
            />
            {
                inOutData?.length !== 0 &&
                <>
                    <SortableExportTable
                        headers={
                            [['Дата', 'date'],
                            ['Номер автомобиля', 'license_plate'],
                            ['Марка', 'car_brand'],
                            ['Время въезда', 'arrival_time'],
                            ['Время выезда', 'departure_time']]
                        }
                        data={inOutData}
                        fileName={person.label + '. ' + new Date().toLocaleDateString()}
                    />
                </>
            }
            {status !== '' && <span className="byPlate__title admin__title--section title title--small">{status}</span>}
        </div>
    )
}