import { useState, useMemo } from 'react';

import jsPDF from "jspdf";
import "jspdf-autotable";

import ReactExport from "react-export-excel";

import '../../../fonts/Roboto-Regular';

export const useSortableExportTable = (headers, items, fileName) => {
    const [sortConfig, setSortConfig] = useState(null);

    const ExcelFile = ReactExport.ExcelFile;
    const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
    const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

    const exportPDF = (table) => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const doc = new jsPDF(orientation, unit, size);

        const headersPDF = [headers.map(elem => elem[0])];
        const data = table.map(elem => Object.values(elem));

        console.log(table)
        console.log(data)

        doc.addFont('Roboto-Regular.ttf', 'Roboto-Regular', 'normal')
        doc.setFont('Roboto-Regular');
        doc.setFontSize(16);
        doc.text(fileName, 40, 50)

        const content = {
            startY: 70,
            head: headersPDF,
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
        doc.save(fileName + '.pdf');
    }

    const sortedItems = useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {

                if (sortConfig.key.split('_')[0] === 'date' || sortConfig.key.split('_')[1] === 'date') {
                    const aDate = new Date(a[sortConfig.key].split('.')[2] + '-' + a[sortConfig.key].split('.')[1] + '-' + a[sortConfig.key].split('.')[0]);
                    const bDate = new Date(b[sortConfig.key].split('.')[2] + '-' + b[sortConfig.key].split('.')[1] + '-' + b[sortConfig.key].split('.')[0]);

                    if (aDate < bDate) {
                        return sortConfig.direction === 'ascending' ? -1 : 1;
                    }
                    if (aDate > bDate) {
                        return sortConfig.direction === 'ascending' ? 1 : -1;
                    }
                }

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