import { useState } from 'react';
import Axios from 'axios';
import jsPDF from "jspdf";
import "jspdf-autotable";
import 'react-calendar/dist/Calendar.css';

import '../../../../../fonts/Roboto-Regular';

export const useByDate = () => {

    const [dateTable, setDateTable] = useState('');
    const [pickedDate, setPickedDate] = useState(new Date());

    const byDate = (newDate) => {
        setPickedDate(newDate);
        newDate = newDate.getFullYear() + "-" + ("0" + (newDate.getMonth() + 1)).slice(-2) + "-" + ("0" + newDate.getDate()).slice(-2);
        console.log(newDate);

        Axios.post('http://localhost:3001/dateTable', {
            date: newDate,
        }).then((response) => {
            setDateTable(response.data.result);
        });
    };

    const exportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const doc = new jsPDF(orientation, unit, size);

        const headers = [['Номер автомобиля', "Регион", "Марка автомобиля", "Время въезда", "Время выезда"]];

        const data = dateTable.map(val => [val.license_plate, val.region, val.car_brand, val.arrival_time, val.departure_time]);

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
        exportPDF
    };
}