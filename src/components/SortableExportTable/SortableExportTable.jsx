import { useSortableExportTable } from './hooks/useSortableExportTable';

export const SortableExportTable = ({ headers, data, fileName }) => {
    const {
        items,
        requestSort,
        sortConfig,
        exportPDF,
        ExcelFile,
        ExcelSheet,
        ExcelColumn
    } = useSortableExportTable(data, fileName);

    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name && 'table__' + sortConfig.direction;
    };

    const keys = Object.keys(data[0]);

    return (
        <>
            <div className="allCars__export-buttons">
                {<ExcelFile filename={fileName} element={<button type='button' className="button button--white signin__button">Экспорт Excel</button>}>
                    <ExcelSheet data={items} name={fileName}>
                        <ExcelColumn label="Номер автомобиля" value="license_plate" />
                        <ExcelColumn label="Марка автомобиля" value="car_brand" />
                        <ExcelColumn label="ФИО владельца" value="name" />
                        <ExcelColumn label="Дата предоставления доступа" value="start_date" />
                        <ExcelColumn label="Дата истечения прав доступа" value="expiration_date" />
                    </ExcelSheet>
                </ExcelFile>}
                {<button className="button button--blue signin__button" onClick={() => exportPDF(items)}>Экспорт PDF</button>}
            </div>
            <table className='table__item'>
                <thead className='table__thead'>
                    <tr className='table__tr'>
                        {headers.map(elem => (
                            // console.log(elem) 
                            <th key={elem[1]}
                                onClick={() => requestSort(elem[1])}
                                className={'table__th table__th-sortable ' + getClassNamesFor(elem[1])}>{elem[0]}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className='table__tbody'>
                    {items.map((obj) => (
                        <tr key={obj.id} className='table__tr'>
                            {keys.map(elem => (
                                elem !== 'id' && <td key={elem + obj.id} className='table__td'>{obj[elem] === null ? 'Нет данных' : obj[elem]}</td>
                            ))}
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </>
    )
}