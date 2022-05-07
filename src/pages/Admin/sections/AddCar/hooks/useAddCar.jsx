import { useState } from 'react';
import Axios from 'axios';

export const useAddCar = () => {
    const [plate, setPlate] = useState('');
    const [region, setRegion] = useState('');
    const [brand, setBrand] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInput = (e) => {
        setError('');
        setSuccess('');

        switch (e.target.name) {
            case 'plate':
                setPlate(e.target.value.trim());
                break;
            case 'region':
                setRegion(e.target.value.trim());
                break;
            case 'brand':
                setBrand(e.target.value.trim());
                break;
            default:
                break;
        }
    };

    const addCar = (e) => {
        if (!plate || !region || !brand)
            setError('Не все поля заполнены!');
        else if (!Number.isInteger(parseInt(region, 10)) || region === '0')
            setError('Введен неверный регион!');
        else {
            Axios.post('http://localhost:3001/addCar', {
                plate: plate,
                region: region,
                brand: brand
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
        }
        e.preventDefault();
    };

    return {
        handleInput,
        addCar,
        error,
        success
    };
};