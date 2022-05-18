import { useState, useCallback } from 'react';
import Axios from 'axios';

export const useChangeData = () => {
    const [plateList, setPlateList] = useState('');
    const [plate, setPlate] = useState('');

    const [isModalOpen, SetIsModalOpen] = useState(false);

    const [error, setError] = useState('');

    const getPlates = useCallback(() => {
        Axios.get('http://localhost:3001/allCarPlates').then((response) => {
            setPlateList(response.data.result);
        });
    }, []);

    const clickOpenModal = (data) => {
        SetIsModalOpen(true);
    }

    const clickCloseModal = () => {
        SetIsModalOpen(false);
    }

    const handleSelectChange = (value) => {
        setError('');
        setPlate(value);
    }

    const handleAcceptClick = () => {
        if (plate) {
            // console.log(plate);
            clickOpenModal();
        }
        else setError('Пожалуйста, введите номер');
    }

    return {
        plateList,
        plate,
        isModalOpen,
        handleSelectChange,
        clickCloseModal,
        getPlates,
        handleAcceptClick,
        error
    };
}