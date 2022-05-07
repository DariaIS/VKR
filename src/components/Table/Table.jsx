import { useTable } from './hooks/useTable';

export const Table = ({ headers, data, setData }) => {
    const { items, requestSort, sortConfig } = useTable(data);

    const getClassNamesFor = (name) => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    const keys = Object.keys(data[0]);

    return (
        <table className='table__item'>
            <thead className='table__thead'>
                <tr className='table__tr'>
                    {headers.map(elem => (
                        // console.log(elem) 
                        <th key={elem[1]}
                            onClick={() => { requestSort(elem[1]) }}
                            className={getClassNamesFor(elem[1])}>{elem[0]}</th>
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
    )
}