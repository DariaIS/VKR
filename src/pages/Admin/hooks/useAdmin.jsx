import { useState, useCallback } from 'react';
import Axios from 'axios';

export const useAdmin = () => {
    const [expiredCars, setExpiredCars] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const getExpiredCars = useCallback(() => {
        console.log('getExpiredCars')
        Axios.get('http://localhost:3001/expiredCars').then((response) => {
            setExpiredCars(response.data.result);
        });
    }, []);

    const updateDate = (e, idCar) => {
        e.preventDefault();
        console.log('updateDate')
        Axios.post('http://localhost:3001/expiredCars', {
            idCar: idCar
        }
        ).then((response) => {
            if (response.data.err) {
                setError(response.data.err);
                setSuccess('');
            }
            else {
                getExpiredCars();
                setSuccess(response.data.message);
                setError('');
            }
        });
    };

    return {
        getExpiredCars,
        expiredCars,
        updateDate,
        error,
        success
    };
}