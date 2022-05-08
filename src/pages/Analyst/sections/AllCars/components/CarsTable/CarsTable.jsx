import { useCarsTable } from './hooks/useCarsTable';

export const CarsTable = ({ headers, data }) => {
    const { 
        items, 
        requestSort, 
        sortConfig,
        exportPDF,
        ExcelFile,
        ExcelSheet,
        ExcelColumn
    } = useCarsTable(data);

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
                {<ExcelFile filename={"Все автомобили на " + new Date().toLocaleDateString()} element={<button type='button' className="button button--white signin__button">Экспорт Excel</button>}>
                    <ExcelSheet data={items} name={"Все автомобили на " + new Date().toLocaleDateString()}>
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
                        <tr key={obj.id_car} className='table__tr'>
                            {keys.map(elem => (
                                elem !== 'id_car' && <td key={elem + obj.id_car} className='table__td'>{obj[elem]}</td>
                            ))}
                        </tr>
                    ))
                    }
                </tbody>
            </table>
        </>
    )
}