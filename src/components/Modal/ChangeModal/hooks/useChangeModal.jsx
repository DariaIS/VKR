import { useState, useCallback } from 'react';
import Axios from 'axios';

export const useChangeModal = (idCar, closeModal) => {
    const [plateData, setPlateData] = useState('');
    const [peopleList, setPeopleList] = useState('');

    const [error, setError] = useState('');

    const handleSelectChange = () => {
        // console.log(e);
        setError('');
        // setGatesChange(e.value);
    }

    const handleAcceptClick = () => {
        console.log(plateData);
        // accept(e, plate);
        // closeModal();
    }

    const getPlateData = useCallback(() => {
        console.log(idCar);
        Axios.get(`http://localhost:3001/changeData?plate=${idCar}`)
            .then((response) => {
                console.log(response.data.result);
                setPlateData(response.data.result);
            });
    }, [idCar]);

    const getPeopleList = useCallback(() => {
        console.log('getPeopleList')
        Axios.get('http://localhost:3001/people')
            .then((response) => {
                // console.log(response.data.result);
                setPeopleList(response.data.result);
            });
    }, []);

    return {
        handleSelectChange,
        getPlateData,
        getPeopleList,
        peopleList,
        handleAcceptClick,
        error
    };
}