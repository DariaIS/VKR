import React, { useState, useEffect } from 'react';

import ReactExport from "react-export-excel";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Axios from 'axios';

function Analyst() {

    const [carTable, setCarTable] = useState('');
    const [dateTable, setDateTable] = useState('');

    const [pickedDate, setPickedDate] = useState(new Date());

    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    const date = (newDate) => {
        setPickedDate(newDate);
        newDate = newDate.getFullYear() + "-" +  ("0"+(newDate.getMonth()+1)).slice(-2) + "-" + ("0" + newDate.getDate()).slice(-2);
        console.log(newDate);

        Axios.post('http://localhost:3001/dateTable', {
            date: newDate, 
        }).then((response) => {
            setDateTable(response.data.result);
        });
    };

    useEffect(() => {
        Axios.get('http://localhost:3001/carTable').then((response) => {
            // console.log(response.data.result);
            setCarTable(response.data.result);
        });
    }, []);

    return (
        <div className="analyst section container">
            <span className="analyst__title title title--medium">Вы вошли как аналитик</span>
            <div className="analyst__table">
            <span className="analyst__table-title title title--small">Выберите дату для формирования отчета</span>
                <Calendar onClickDay={date} value={pickedDate} minDetail="year"/>
                {
                    dateTable.length !== 0 && 
                    <div>
                        <span className="analyst__table-title title title--small">Отчет о въездах и выездах на {pickedDate.toLocaleDateString()}</span>
                        <table className="analyst__table-item">
                            <thead className="analyst__thead">
                                <tr className="analyst__tr">
                                    <th className="analyst__th">Номер автомобиля</th>
                                    <th className="analyst__th">Регион</th>
                                    <th className="analyst__th">Марка автомобиля</th>
                                    <th className="analyst__th">Время въезда</th>
                                    <th className="analyst__th">Время выезда</th>
                                </tr>
                            </thead>
                            <tbody className="analyst__tbody">
                                {
                                    Object.values(dateTable).map(val => {
                                        return (
                                            <tr className="analyst__tr" key={val.id_car}>
                                                <td className="analyst__td">{val.license_plate}</td>
                                                <td className="analyst__td">{val.region}</td>
                                                <td className="analyst__td">{val.car_brand}</td>
                                                <td className="analyst__td">{val.arrival_time}</td>
                                                <td className="analyst__td">{val.departure_time}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        {console.log(dateTable)}
                        {
                            <ExcelFile filename={"Отчет " + pickedDate.toLocaleDateString()} element={<button type='button' className="button button--blue signin__button signin__button--center">Экспорт в Excel</button>}>
                                <ExcelSheet data={dateTable} name={"Отчет " + pickedDate.toLocaleDateString()}>
                                    <ExcelColumn label="Номер автомобиля" value="license_plate"/>
                                    <ExcelColumn label="Регион" value="region"/>
                                    <ExcelColumn label="Марка автомобиля" value="car_brand"/>
                                    <ExcelColumn label="Время въезда" value="arrival_time"/>
                                    <ExcelColumn label="Время выезда" value="departure_time"/>
                                </ExcelSheet>
                            </ExcelFile>
                        }
                    </div>
                    
                }
                
            </div>
            <div className="analyst__table">
                <span className="analyst__table-title title title--small">Все машины, присутствующие в базе данных</span>
                <table className="analyst__table-item">
                    <thead className="analyst__thead">
                        <tr className="analyst__tr">
                            <th className="analyst__th">Номер машины</th>
                            <th className="analyst__th">Марка машины</th>
                            <th className="analyst__th">Фамилия</th>
                            <th className="analyst__th">Имя</th>
                            <th className="analyst__th">Отчество</th>
                            <th className="analyst__th">Дата предоставления доступа</th>
                            <th className="analyst__th">Дата истечения прав доступа</th>
                        </tr>
                    </thead>
                    <tbody className="analyst__tbody">
                        {
                            Object.values(carTable).map(val => {
                                return (
                                    <tr className="analyst__tr" key={val.id_car}>
                                        <td className="analyst__td">{val.license_plate}</td>
                                        <td className="analyst__td">{val.car_brand}</td>
                                        <td className="analyst__td">{val.last_name}</td>
                                        <td className="analyst__td">{val.name}</td>
                                        <td className="analyst__td">{val.middle_name}</td>
                                        <td className="analyst__td">{new Date(val.start_date).toLocaleDateString()}</td>
                                        <td className="analyst__td">{new Date(val.expiration_date).toLocaleDateString()}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Analyst;