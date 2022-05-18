import { useState, useCallback } from 'react';
import Axios from 'axios';

export const useChangeModal = (plate, closeModal) => {
    const [peopleList, setPeopleList] = useState('');
    const [gatesList, setGatesList] = useState('');

    const [selectedPerson, setSelectedPerson] = useState('');
    const [selectedGates, setSelectedGates] = useState('');
    const [brand, setBrand] = useState('');
    const [expTime, setExpTime] = useState('');

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

    const getCarData = useCallback(() => {
        console.log(plate);
        Axios.get(`http://localhost:3001/changeCarData?plate=${plate.value}`)
            .then((response) => {
                console.log(response.data);
                setPeopleList(response.data.peopleList);
                setGatesList(response.data.gatesList);

                const person = response.data.peopleList.find(element => element.value === response.data.carData.id_person);
                setSelectedPerson(person);
                setSelectedGates(response.data.carData.gates);
            });
    }, [plate]);


    return {
        handlePersonSelect,
        handleGatesSelect,
        getCarData,
        peopleList,
        gatesList,
        selectedPerson,
        selectedGates,
        handleAcceptClick,
        error
    };
}