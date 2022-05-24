import React, { useEffect } from 'react';

import Select from 'react-select';

import { usePlateModal } from './hooks/usePlateModal';

export const PlateModal = ({ closeModal, accept, direction }) => {
    const {
        plateList,
        handleSelectChange,
        getPlates,
        handleAcceptClick,
        error
    } = usePlateModal(accept, closeModal);

    useEffect(() => {
        console.log('PlateModal');
        getPlates();
    }, [getPlates]);

    return (
        <>
            <p className='plateModal__text'>
                Номер не распознан! Пожалуйста, введите номер вручную.
            </p>
            <div className='plateModal__elems'>
                <Select className='plateModal__select select select--medium'                    onChange={(e) => handleSelectChange(e.value)}
                    options={plateList}
                    placeholder='Номер и регион'
                    noOptionsMessage={() => 'Номер не найден'}
                />
                <button type='button' className="plateModal__button button button--whit" onClick={closeModal}>Отмена</button>
                <button type='button' className="plateModal__button button button--blue" onClick={() => handleAcceptClick(direction)}>Подтвердить</button>
            </div>
            {/* {error && <div>{error}</div>} */}
            {error === '' && <span className="status">&nbsp;</span>}
            {error !== '' && <span className="status status--warning status--left">{error}</span>}
        </>
    );
};