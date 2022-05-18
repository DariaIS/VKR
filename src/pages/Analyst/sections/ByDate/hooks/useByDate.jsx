import { useState } from 'react';
import Axios from 'axios';

export const useByDate = () => {

    const [dateTable, setDateTable] = useState('');
    const [pickedDate, setPickedDate] = useState(new Date());

    const byDate = (newDate) => {
        setPickedDate(newDate);
        newDate = newDate.getFullYear() + "-" + ("0" + (newDate.getMonth() + 1)).slice(-2) + "-" + ("0" + newDate.getDate()).slice(-2);

        Axios.post('http://localhost:3001/dateTable', {
            date: newDate,
        }).then((response) => {
            console.log(response.data.result);
            setDateTable(response.data.result);
        });
    };

    return {
        dateTable,
        pickedDate,
        byDate
    };
}