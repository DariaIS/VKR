import { useState, useCallback } from 'react';
import Axios from 'axios';

export const useAddPerson = () => {
    // const [name, setName] = useState('');
    // const [lastName, setLastName] = useState('');
    // const [middleName, setMiddleName] = useState('');
    // const [position, setPosition] = useState('');
    // const [chair, setChair] = useState('');

    const [chairList, setChairList] = useState([]);
    const [personData, setPersonData] = useState({
        name: '',
        lastName: '',
        middleName: '',
        position: '',
        idChair: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const getChairs = useCallback(() => {
        console.log('getChairs')
        Axios.get('http://localhost:3001/allChairs').then((response) => {
            if (response.data.result)
                setChairList(response.data.result);
        });
    }, []);

    const handleChairSelect = (e) => {
        setError('');
        setSuccess('');

        setPersonData(personData => ({...personData, [e.name]: e.value}))
    };

    const handleInput = (e) => {
        setError('');
        setSuccess('');

        setPersonData(personData => ({...personData, [e.target.name]: e.target.value.trim()}));
    };

    const handleAcceptClick = (e) => {
        setError('');
        console.log(personData)
        if (Object.values(personData).every(x => x !== '')) {
            Axios.post('http://localhost:3001/addPerson', {
                name: personData.name,
                lastName: personData.lastName,
                middleName: personData.middleName,
                idChair: personData.idChair,
                position: personData.position
            }).then((response) => {
                if (response.data.message) {
                    setSuccess(response.data.message);
                    setError('');
                }
                else {
                    setError(response.data.err);
                    setSuccess('');
                }
            });
        } else setError('Не все поля заполнены!');
    };

    return {
        getChairs,
        chairList,
        handleInput,
        handleChairSelect,
        handleAcceptClick,
        error,
        success
    };
}