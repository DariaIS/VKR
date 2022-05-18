import { useState, useMemo } from 'react';

import jsPDF from "jspdf";
import "jspdf-autotable";

import ReactExport from "react-export-excel";

export const useSortableExportTable = (items) => {
    const [sortConfig, setSortConfig] = useState(null);

    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    const exportPDF = (table) => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const doc = new jsPDF(orientation, unit, size);

        const headers = [['Номер автомобиля', 'Марка автомобиля', 'ФИО владельца', 'Дата предоставления доступа', 'Дата истечения прав доступа']];

        console.log(table)
        const data = table.map(elem => [
            elem.license_plate,
            elem.car_brand,
            elem.name,
            elem.start_date,
            elem.expiration_date
        ]);

        doc.addFont('Roboto-Regular.ttf', 'Roboto-Regular', 'normal')
        doc.setFont('Roboto-Regular');
        doc.setFontSize(16);
        doc.text('Все автомобили на ' + new Date().toLocaleDateString(), 40, 50)

        const content = {
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

    const sortedItems = useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    }

    return {
        items: sortedItems,
        requestSort,
        sortConfig,
        exportPDF,
        ExcelFile,
        ExcelSheet,
        ExcelColumn
    };
}