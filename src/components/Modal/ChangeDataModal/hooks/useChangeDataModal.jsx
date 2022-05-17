import { useState, useCallback } from 'react';
import Axios from 'axios';

export const usePlateModal = (accept, plate, closeModal) => {
    const [plateList, setPlateList] = useState('');
    const [plateData, setPlateData] = useState('');

    const [lastNameChange, setLastNameChange] = useState('');
    const [nameChange, setNameChange] = useState('');
    const [middleNameChange, setMiddleNameChange] = useState('');
    const [chairChange, setChairChange] = useState('');
    const [positionChange, setPositionChange] = useState('');
    const [gatesChange, setGatesChange] = useState('');

    const [error, setError] = useState('');

    const handleSelectChange = (e) => {
        // console.log(e);
        setError('');
        setGatesChange(e.value);
    }

    const handleAcceptClick = (e) => {
        // console.log(plate);
        accept(e, plate);
        closeModal();
    }

    const getPlateData = useCallback((plate) => {
        console.log('getPlateData')
        Axios.get(`http://localhost:3001/changeData?plate=${plate}`).then((response) => {
            // console.log(response.data.result);
            setPlateData(response.data.result);
        });
    }, []);

    return {
        plateList,
        handleSelectChange,
        getPlateData,
        handleAcceptClick,
        error
    };
}