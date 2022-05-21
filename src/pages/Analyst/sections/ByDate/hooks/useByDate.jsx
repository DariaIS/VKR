import { useState, useCallback } from 'react';
import Axios from 'axios';

export const useByDate = () => {

    const [table, setTable] = useState([]);
    const [pickedDate, setPickedDate] = useState(new Date());

    const byDate = useCallback(() => {
        const newDate = pickedDate.getFullYear() + "-" + ("0" + (pickedDate.getMonth() + 1)).slice(-2) + "-" + ("0" + pickedDate.getDate()).slice(-2);

        Axios.post('http://localhost:3001/byDate', {
            date: newDate,
        }).then((response) => {
            setTable(response.data.result);
        });
    }, [pickedDate]);

    return {
        table,
        pickedDate,
        setPickedDate,
        byDate
    };
}