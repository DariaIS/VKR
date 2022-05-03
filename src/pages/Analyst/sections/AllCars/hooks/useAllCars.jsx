import { useState } from 'react';

import jsPDF from "jspdf";
import "jspdf-autotable";

import ReactExport from "react-export-excel";

export const useAllCars = () => {
    const [carTable, setCarTable] = useState('');

    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const doc = new jsPDF(orientation, unit, size);

        const headers = [['Номер автомобиля', 'Марка автомобиля', 'ФИО владельца', 'Дата предоставления доступа', 'Дата истечения прав доступа']];

        const data = carTable.map(val => [
            val.license_plate + ' ' + val.region,
            val.car_brand,
            val.last_name + ' ' + val.name + ' ' + val.middle_name,
            val.start_date,
            val.expiration_date
        ]);

        doc.addFont('Roboto-Regular.ttf', 'Roboto-Regular', 'normal')
        doc.setFont('Roboto-Regular');
        doc.setFontSize(16);
        doc.text('Все автомобили на ' + new Date().toLocaleDateString(), 40, 50)

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
        doc.save('Все автомобили на ' + new Date().toLocaleDateString() + '.pdf');
    }

    return {
        carTable,
        setCarTable,
        exportPDF,
        ExcelFile,
        ExcelSheet,
        ExcelColumn
    };
}