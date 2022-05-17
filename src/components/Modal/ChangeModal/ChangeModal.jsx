import React, { useEffect } from 'react';

import Select from 'react-select';

import { useChangeModal } from './hooks/useChangeModal';

export const ChangeModal = ({ idCar, closeModal }) => {
    const {
        handlePersonSelect,
        handleGatesSelect,
        getPlateData,
        peopleList,
        gatesList,
        selectedPerson,
        selectedGates,
        handleAcceptClick,
        error
    } = useChangeModal(idCar, closeModal);

    useEffect(() => {
        getPlateData();
    }, [getPlateData]);

    return (
        <>
            <p className='changeModal__text'>
                Изменение данных об автомобиле
                {/* {'\n'} */}
            </p>
            <div className='changeModal__elems'>
                <Select className="changeModal__select"
                    value={selectedPerson}
                    onChange={(e) => handlePersonSelect(e)}
                    options={peopleList}
                />
                <Select className="changeModal__select"
                    isMulti='true'
                    value={selectedGates}
                    onChange={(e) => handleGatesSelect(e)}
                    options={gatesList}
                />
                <button type='button' className="changeModal__button button button--whit" onClick={closeModal}>Отмена</button>
                <button id='in' type='button' className="changeModal__button button button--blue" onClick={(e) => handleAcceptClick(e)}>Подтвердить</button>
            </div>
            {/* {error && <div>{error}</div>} */}
            {error === '' && <span className="status">&nbsp;</span>}
            {error !== '' && <span className="status status--warning status--left">{error}</span>}
        </>
    );
};