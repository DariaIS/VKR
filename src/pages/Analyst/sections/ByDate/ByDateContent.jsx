import React, { useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { SortableExportTable } from '../../../../components/SortableExportTable';

import { useByDate } from './hooks/useByDate';

export const ByDateContent = () => {
    const {
        dateTable,
        pickedDate,
        setPickedDate,
        carNumber,
        byDate
    } = useByDate();

    useEffect(() => {
        console.log('byDateEffect');
        byDate();
    }, [byDate]);

    return (
        <div className="byDate section container">
            <div className="table">
                <span className="table__title title title--medium">Выберите дату для формирования отчета</span>
                <Calendar onClickDay={(e) => setPickedDate(e)} value={pickedDate} minDetail="year" />
                {
                    dateTable?.length !== 0 ?
                        <div>
                            <span className="table__title title title--medium">Отчет о въездах и выездах на {pickedDate.toLocaleDateString()}</span>
                            <span className="table__title title title--small">Количество въежавших автомобилей - {carNumber}</span>
                            <SortableExportTable
                                headers={
                                    [['Номер автомобиля', 'license_plate'],
                                    ['Марка', 'car_brand'],
                                    ['Время въезда', 'arrival_time'],
                                    ['Время выезда', 'departure_time']]
                                }
                                data={dateTable}
                                fileName={'Въезды и выезды ' + pickedDate.toLocaleDateString()}
                                count={'Количество въежавших автомобилей - ' + carNumber}
                            />
                        </div>
                        : <div className="title title--medium">Нет данных о въездах и выездах в этот день</div>
                }
            </div>
        </div>
    )
}