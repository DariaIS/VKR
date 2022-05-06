import { useState } from 'react';
import Axios from 'axios';

import jsPDF from "jspdf";
import "jspdf-autotable";

import ReactExport from "react-export-excel";

import '../../../../../fonts/Roboto-Regular';

export const useByDate = () => {

    const [dateTable, setDateTable] = useState('');
    const [pickedDate, setPickedDate] = useState(new Date());

    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    const byDate = (newDate) => {
        setPickedDate(newDate);
        newDate = newDate.getFullYear() + "-" + ("0" + (newDate.getMonth() + 1)).slice(-2) + "-" + ("0" + newDate.getDate()).slice(-2);

        Axios.post('http://localhost:3001/dateTable', {
            date: newDate,
        }).then((response) => {
            setDateTable(response.data.result);
        });
    };

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";

        const doc = new jsPDF(orientation, unit, size);

        const headers = [['Номер автомобиля', 'Марка автомобиля', 'Время въезда', 'Время выезда']];

        const data = dateTable.map(val => [
            val.license_plate,
            val.car_brand,
            val.arrival_time,
            val.departure_time
        ]);

        doc.addFont('Roboto-Regular.ttf', 'Roboto-Regular', 'normal')
        doc.setFont('Roboto-Regular');
        doc.setFontSize(16);
        doc.text('Отчет ' + pickedDate.toLocaleDateString(), 40, 50)

        let content = {
            startY: 70,
            head: headers,
            body: data,
            theme: 'plain',
            headStyles: {
                fillColor: '#CBCCD2',
            },
            styles: {
                font: 'Roboto-Regular',
                fontSize: 12,
                lineWidth: 1
            }
        };


        doc.autoTable(content)
        doc.save('Отчет ' + pickedDate.toLocaleDateString() + '.pdf');
    }

    return {
        dateTable,
        pickedDate,
        byDate,
        exportPDF,
        ExcelFile,
        ExcelSheet,
        ExcelColumn
    };
}