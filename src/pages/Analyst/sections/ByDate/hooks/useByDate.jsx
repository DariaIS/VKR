import { useState, useCallback } from 'react';
import Axios from 'axios';

export const useByDate = () => {

    const [dateTable, setDateTable] = useState('');
    const [pickedDate, setPickedDate] = useState(new Date());
    const [carNumber, setCarNumber] = useState('');


    const byDate = useCallback((newDate) => {
        console.log(pickedDate);
        if (!newDate)
            newDate = pickedDate;
        newDate = newDate.getFullYear() + "-" + ("0" + (newDate.getMonth() + 1)).slice(-2) + "-" + ("0" + newDate.getDate()).slice(-2);

        Axios.post('http://localhost:3001/dateTable', {
            date: newDate,
        }).then((response) => {
            setCarNumber(response.data.result.length);
            setDateTable(response.data.result);
        });
    }, [pickedDate]);

    return {
        dateTable,
        pickedDate,
        setPickedDate,
        carNumber,
        byDate
    };
}