import { useState } from 'react';
import Axios from 'axios';

export const useAddCar = () => {
    const [plate, setPlate] = useState('');
    const [region, setRegion] = useState('');
    const [brand, setBrand] = useState('');
    const [lastName, setLastName] = useState('');
    const [name, setName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [chair, setChair] = useState('');
    const [position, setPosition] = useState('');
    const [gates, setGates] = useState('');

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
            case 'lastName':
                setLastName(e.target.value.trim());
                break;
            case 'name':
                setName(e.target.value.trim());
                break;
            case 'middleName':
                setMiddleName(e.target.value.trim());
                break;
            case 'chair':
                setChair(e.target.value.trim());
                break;
            case 'gates':
                setGates(e.target.value);
                break;
            case 'position':
                setPosition(e.target.value.trim());
                break;
            default:
                break;
        }
    };

    const addCar = (e) => {
        Axios.post('http://localhost:3001/addCar', {
            plate: plate,
            region: region,
            brand: brand,
            lastName: lastName,
            name: name,
            middleName: middleName,
            chair: chair,
            gates: gates,
            position: position

        }).then((response) => {
            if (response.data.message)
                if (response.data.message === 'Запись успешно добавлена!') {
                    setSuccess(response.data.message);
                    setError('');
                }
                else {
                    setError(response.data.message);
                    setSuccess('');
                }
        });
        e.preventDefault();
    };

    return {
        handleInput,
        addCar,
        error,
        success
    };
};