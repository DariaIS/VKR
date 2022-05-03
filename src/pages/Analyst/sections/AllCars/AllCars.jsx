import React, { useEffect } from 'react';
import Axios from 'axios';

import { Header } from '../../../../components';
import { AnalystNavigation } from '../../AnalystNavigation/AnalystNavigation';

import { useAllCars } from './hooks/useAllCars';

export const AllCars = () => {
    const {
        carTable,
        setCarTable,
        exportPDF,
        ExcelFile,
        ExcelSheet,
        ExcelColumn
    } = useAllCars();

    useEffect(() => {
        // console.log('car')
        Axios.get('http://localhost:3001/carTable').then((response) => {
            setCarTable(response.data.result);
        });
    }, [setCarTable]);

    return (
        <>
            <Header>
                <AnalystNavigation />
            </Header>

            <div className="allCars section container">
                <div className="table">
                    <span className="table__title title title--medium">Все машины, присутствующие в базе данных</span>
                    <div className="allCars__export-buttons">
                        {<ExcelFile filename={"Все автомобили на " + new Date().toLocaleDateString()} element={<button type='button' className="button button--white signin__button">Экспорт Excel</button>}>
                            <ExcelSheet data={carTable} name={"Все автомобили на " + new Date().toLocaleDateString()}>
                                <ExcelColumn label="Номер автомобиля" value="license_plate" />
                                <ExcelColumn label="Марка автомобиля" value="car_brand" />
                                <ExcelColumn label="ФИО владельца" value="name" />
                                <ExcelColumn label="Дата предоставления доступа" value="start_date" />
                                <ExcelColumn label="Дата истечения прав доступа" value="expiration_date" />
                            </ExcelSheet>
                        </ExcelFile>}
                        {<button className="button button--blue signin__button" onClick={exportPDF}>Экспорт PDF</button>}
                    </div>
                    <table className="table__item">
                        <thead className="table__thead">
                            <tr className="table__tr">
                                <th className="table__th">Номер машины</th>
                                <th className="table__th">Марка машины</th>
                                <th className="table__th">ФИО владельца</th>
                                <th className="table__th">Дата предоставления доступа</th>
                                <th className="table__th">Дата истечения прав доступа</th>
                            </tr>
                        </thead>
                        <tbody className="table__tbody">
                            {
                                Object.values(carTable).map(val => {
                                    return (
                                        <tr className="table__tr" key={val.id_car}>
                                            <td className="table__td">{val.license_plate + ' ' + val.region}</td>
                                            <td className="table__td">{val.car_brand}</td>
                                            <td className="table__td">{val.last_name + ' '+ val.name + ' '+ val.middle_name}</td>
                                            <td className="table__td">{val.start_date}</td>
                                            <td className="table__td">{val.expiration_date}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}