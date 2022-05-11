import { useState, useCallback } from 'react';
import Axios from 'axios';

export const usePlateModal = (accept, closeModal) => {
    const [plateList, setPlateList] = useState('');
    const [plate, setPlate] = useState('');

    const [error, setError] = useState('');

    const handleSelectChange = (e) => {
        // console.log(e);
        setError('');
        setPlate(e.value);
    }

    const handleAcceptClick = (e) => {
        if (plate) {
            console.log(plate);
            accept(e, plate);
            closeModal();
        }
        else setError('Пожалуйста, введите номер');
    }

    const getPlates = useCallback(() => {
        console.log('getPlates')
        Axios.get('http://localhost:3001/carsPlates').then((response) => {
            console.log(response.data.result);
            setPlateList(response.data.result);
        });
    }, []);

    return {
        plateList,
        handleSelectChange,
        getPlates,
        handleAcceptClick,
        error
    };
}