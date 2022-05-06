export const SortableTable = ({ headers, data }) => {
    const keys = Object.keys(data[0]);

    return (
        <table className='table__item'>
            <thead className='table__thead'>
                <tr className='table__tr'>
                    {headers.map(elem => (
                        // console.log(elem) 
                        <th key={elem} className='table__th'>{elem}</th>
                    ))}
                </tr>
            </thead>
            <tbody className='table__tbody'>
                {data.map((obj) => (
                    <tr key={obj.id_car} className='table__tr'>
                        {keys.map(elem => (
                            elem !== 'id_car' && <td key={elem + obj.id_car} className='table__td'>{obj[elem]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}