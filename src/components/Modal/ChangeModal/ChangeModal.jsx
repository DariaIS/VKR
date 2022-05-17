import React, { useEffect } from 'react';

import Select from 'react-select';

import { useChangeModal } from './hooks/useChangeModal';

export const ChangeModal = ({ idCar, closeModal }) => {
    const {
        handleSelectChange,
        getPlateData,
        getPeopleList,
        peopleList,
        handleAcceptClick,
        error
    } = useChangeModal(idCar, closeModal);

    useEffect(() => {
        console.log(idCar);
        getPlateData();
        getPeopleList();
    }, [idCar, getPlateData, getPeopleList]);

    return (
        <>
            <p className='changeDataModal__text'>
                Изменение данных об автомобиле
                {/* {'\n'} */}
            </p>
            <div className='changeDataModal__elems'>
                <Select className="plateModal__select"
                    onChange={(e) => handleSelectChange(e)}
                    options={peopleList}
                />
                <button type='button' className="changeDataModal__button button button--whit" onClick={closeModal}>Отмена</button>
                <button id='in' type='button' className="changeDataModal__button button button--blue" onClick={(e) => handleAcceptClick(e)}>Подтвердить</button>
            </div>
            {/* {error && <div>{error}</div>} */}
            {error === '' && <span className="status">&nbsp;</span>}
            {error !== '' && <span className="status status--warning status--left">{error}</span>}
        </>
    );
};