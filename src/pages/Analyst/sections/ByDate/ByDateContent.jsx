import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { SortableExportTable } from '../../../../components/SortableExportTable';

import { useByDate } from './hooks/useByDate';

export const ByDateContent = () => {
    const {
        dateTable,
        pickedDate,
        byDate
    } = useByDate();

    return (
        <div className="byDate section container">
            <div className="table">
                <span className="table__title title title--medium">Выберите дату для формирования отчета</span>
                <Calendar onClickDay={byDate} value={pickedDate} minDetail="year" />
                {
                    dateTable?.length !== 0 ?
                        <div>
                            <span className="table__title title title--medium">Отчет о въездах и выездах на {pickedDate.toLocaleDateString()}</span>
                            <SortableExportTable
                                headers={
                                    [['Номер автомобиля', 'license_plate'],
                                    ['Марка', 'car_brand'],
                                    ['Время въезда', 'arrival_time'],
                                    ['Время выезда', 'departure_time']]
                                }
                                data={dateTable}
                                fileName={'Въезды и выезды ' + pickedDate.toLocaleDateString()}
                            />
                        </div>
                        : <div className="title title--small">Нет данных о въездах и выездах в этот день</div>
                }
            </div>
        </div>
    )
}