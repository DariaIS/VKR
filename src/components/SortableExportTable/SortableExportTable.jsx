import { useSortableExportTable } from './hooks/useSortableExportTable';

export const SortableExportTable = ({ headers, data, fileName, count }) => {
    const {
        items,
        requestSort,
        sortConfig,
        exportPDF,
        ExcelFile,
        ExcelSheet,
        ExcelColumn
    } = useSortableExportTable(headers, data, fileName, count);

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
                        {headers.map(elem => <ExcelColumn key={elem[1]} label={elem[0]} value={elem[1]} />)}
                    </ExcelSheet>
                </ExcelFile>}
                {<button className="button button--blue signin__button" onClick={() => exportPDF(items)}>Экспорт PDF</button>}
            </div>

            <div className='table'>
                <table className='table__table'>
                    {/* {console.log(items)} */}
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
                                    elem !== 'id' && <td key={elem + obj.id} className='table__td'>{obj[elem]}</td>
                                ))}
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}