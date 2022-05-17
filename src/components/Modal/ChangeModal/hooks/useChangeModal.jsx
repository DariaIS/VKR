import { useState, useCallback } from 'react';
import Axios from 'axios';

export const useChangeModal = (idCar, closeModal) => {
    const [plateData, setPlateData] = useState('');
    const [peopleList, setPeopleList] = useState('');
    const [gatesList, setGatesList] = useState('');

    const [selectedPerson, setSelectedPerson] = useState('');
    const [selectedGates, setSelectedGates] = useState('');

    const [error, setError] = useState('');

    const handlePersonSelect = (e) => {
        setSelectedPerson(e);
        setError('');
    }

    const handleGatesSelect = (e) => {
        console.log(e);
        setSelectedGates(e);
        setError('');
    }

    const handleAcceptClick = () => {
        if (selectedGates.length !== 0) {
            console.log(selectedPerson);
            console.log(selectedGates);
        }
        else {
            setError('Не все поля заполнены!');

        }
        // accept(e, plate);
        // closeModal();
    }

    const getPlateData = useCallback(() => {
        console.log('getPlateData');
        Axios.get(`http://localhost:3001/changeCarData?plate=${idCar}`)
            .then((response) => {
                console.log(response.data);
                setPeopleList(response.data.peopleList);
                setGatesList(response.data.gatesList);

                const person = response.data.peopleList.find(element => element.value === response.data.carData.id_person);
                setSelectedPerson(person);
                setSelectedGates(response.data.carData.gates);
                setPlateData(response.data.carData);
            });
    }, [idCar]);


    return {
        handlePersonSelect,
        handleGatesSelect,
        getPlateData,
        peopleList,
        gatesList,
        selectedPerson,
        selectedGates,
        handleAcceptClick,
        error
    };
}