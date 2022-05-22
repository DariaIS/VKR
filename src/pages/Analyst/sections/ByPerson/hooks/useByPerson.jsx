import { useState, useCallback } from 'react';
import Axios from 'axios';

export const useByPerson = () => {

    const [inOutData, setInOutData] = useState('');
    const [personList, setPlateList] = useState(new Date());

    const [person, setPerson] = useState('');
    const [status, setStatus] = useState('');

    const getPersonList = useCallback(() => {
        Axios.get('http://localhost:3001/allPeople').then((response) => {
            if (response.data.result)
                setPlateList(response.data.result);
        });
    }, []);

    const getinOutData = (person) => {
        setStatus('');
        setPerson(person);
        Axios.get(`http://localhost:3001/byPerson?person=${person.value}`).then((response) => {
            setInOutData(response.data.result);

            if (response.data.result.length === 0) {
                setStatus('Нет данных о въездах и выездах автомобиля данного владельца');
            }
            setInOutData(response.data.result);
        });
    };


    return {
        getPersonList,
        personList,
        getinOutData,
        inOutData,
        person,
        status
    };
}