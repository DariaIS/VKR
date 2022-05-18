import { useState, useCallback } from 'react';
import Axios from 'axios';

export const useChangeModal = (plate, closeModal) => {
    const [peopleList, setPeopleList] = useState('');
    const [gatesList, setGatesList] = useState('');

    const [selectedPerson, setSelectedPerson] = useState('');
    const [selectedGates, setSelectedGates] = useState('');
    const [expDate, setExpDate] = useState('');
    const [brand, setBrand] = useState('');

    const [error, setError] = useState('');

    const handlePersonSelect = (e) => {
        setError('');
        setSelectedPerson(e);
    }

    const handleGatesSelect = (e) => {
        setError('');
        setSelectedGates(e);
    }

    const handleInput = (e) => {
        setError('');

        switch (e.target.name) {
            case 'expDate':
                setExpDate(e.target.value);
                break;
            case 'brand':
                setBrand(e.target.value);
                break;
            default:
                break;
        }
    };

    const handleAcceptClick = () => {
        setError('');
        if (selectedGates.length !== 0 && expDate !== '' && brand.trim() !== '') {
            const gates = [];
            selectedGates.forEach(elem => gates.push([plate.value, elem.value]));

            Axios.post('http://localhost:3001/changeCarData', {
                plateId: plate.value,
                personId: selectedPerson?.value,
                expDate: expDate,
                brand: brand.trim(),
                gates: gates
            }).then((response) => {
                if (response.data.err) {
                    setError(response.data.err);
                }
                else {
                    closeModal();
                }
            });
        }
        else {
            setError('Не все поля заполнены!');
        }
        // accept(e, plate);
        // closeModal();
    }

    const getCarData = useCallback(() => {
        // console.log(plate);
        Axios.get(`http://localhost:3001/changeCarData?plate=${plate.value}`)
            .then((response) => {
                console.log(response.data);
                console.log(response.data.carData.expiration_date);
                setPeopleList(response.data.peopleList);
                setGatesList(response.data.gatesList);

                const person = response.data.peopleList.find(element => element.value === response.data.carData.id_person);
                setSelectedPerson(person);
                setSelectedGates(response.data.carData.gates);
                setExpDate(response.data.carData.expiration_date);
                setBrand(response.data.carData.car_brand);
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
        expDate,
        brand,
        handleInput,
        handleAcceptClick,
        error
    };
}