import React, { useEffect } from 'react';

import Select from 'react-select';

import { useChangeModal } from './hooks/useChangeModal';

export const ChangeModal = ({ plate, closeModal }) => {
    const {
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
    } = useChangeModal(plate, closeModal);

    useEffect(() => {
        getCarData();
    }, [getCarData]);

    return (
        <>
            <p className='changeModal__text'>
                Просмотр и изменение данных об автомобиле {plate.label.split(' ')[0]} с регионом {plate.label.split(' ')[1]}
                {/* {'\n'} */}
            </p>
            <form className='changeModal__form'>
                <label className="changeModal__form-item form__item">
                    <input name='brand' className="input input--medium input--default" type="text"
                        value={brand}
                        onChange={(e) => handleInput(e)} />
                    <span className="input__name">Марка автомобиля</span>
                </label>
                <label className="changeModal__form-item form__item">
                    <input name='expDate' className="input input--medium input--default" type="date"
                        value={expDate}
                        onChange={(e) => handleInput(e)} />
                    <span className="input__name">Дата истечения прав доступа</span>
                </label>
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
                <button type='button' className="changeModal__button button button--blue" onClick={(e) => handleAcceptClick(e)}>Изменить</button>
            </form>
            {/* {error && <div>{error}</div>} */}
            {error === '' && <span className="status">&nbsp;</span>}
            {error !== '' && <span className="status status--warning status--center">{error}</span>}
        </>
    );
};