import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { Header } from '../../../../components';
import { AnalystNavigation } from '../../AnalystNavigation';
import { ProtectedRoute } from '../../../../components/ProtectedRoute';

import { useByDate } from './hooks/useByDate';

export const ByDate = () => {
    const {
        dateTable,
        pickedDate,
        byDate,
        exportPDF,
        ExcelFile,
        ExcelSheet,
        ExcelColumn
    } = useByDate();

    return (
        <ProtectedRoute role='analyst' setNewRole={null}>
            <Header>
                <AnalystNavigation />
            </Header>
            <div className="byDate section container">
                <div className="table">
                    <span className="table__title title title--medium">Выберите дату для формирования отчета</span>
                    <Calendar onClickDay={byDate} value={pickedDate} minDetail="year" />
                    {
                        dateTable.length !== 0 ?
                            <div>
                                <span className="table__title title title--medium">Отчет о въездах и выездах на {pickedDate.toLocaleDateString()}</span>
                                <table className="table__item">
                                    <thead className="table__thead">
                                        <tr className="table__tr">
                                            <th className="table__th">
                                                Номер автомобиля
                                            </th>
                                            <th className="table__th">
                                                Марка автомобиля
                                            </th>
                                            <th className="table__th">
                                                Время въезда
                                            </th>
                                            <th className="table__th">
                                                Время выезда
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="table__tbody">
                                        {Object.values(dateTable).map(val => {
                                            return (
                                                <tr className="table__tr" key={val.id_car}>
                                                    <td className="table__td">{val.license_plate}</td>
                                                    <td className="table__td">{val.car_brand}</td>
                                                    <td className="table__td">{val.arrival_time}</td>
                                                    <td className="table__td">{val.departure_time}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                                <div className="byDate__export-buttons">
                                    {<ExcelFile filename={"Отчет " + pickedDate.toLocaleDateString()} element={<button type='button' className="button button--white signin__button">Экспорт Excel</button>}>
                                        <ExcelSheet data={dateTable} name={"Отчет " + pickedDate.toLocaleDateString()}>
                                            <ExcelColumn label="Номер автомобиля" value="license_plate" />
                                            <ExcelColumn label="Регион" value="region" />
                                            <ExcelColumn label="Марка автомобиля" value="car_brand" />
                                            <ExcelColumn label="Время въезда" value="arrival_time" />
                                            <ExcelColumn label="Время выезда" value="departure_time" />
                                        </ExcelSheet>
                                    </ExcelFile>}
                                    {<button className="button button--blue signin__button" onClick={exportPDF}>Экспорт PDF</button>}
                                </div>
                            </div>
                            : <div className="title title--small">Нет данных о въездах и выездах в этот день</div>
                    }
                </div>
            </div>
        </ProtectedRoute>
    )
}