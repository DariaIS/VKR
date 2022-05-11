import React, { useEffect } from 'react';

import Select from 'react-select';

import { usePlateModal } from './hooks/usePlateModal';

export const PlateModal = ({ closeModal, accept }) => {
    const {
        plateList,
        handleSelectChange,
        getPlates,
        handleAcceptClick,
        error
    } = usePlateModal(accept, closeModal);

    useEffect(() => {
        console.log('PlateModal')
        getPlates();
    }, [getPlates]);

    return (
        <>
            <p className='plateModal__text'>
                Номер не распознан! Пожалуйста, введите номер вручную.
                {/* {'\n'} */}
            </p>
            <div className='plateModal__elems'>
                <Select className="plateModal__select"
                    onChange={(e) => handleSelectChange(e)}
                    options={plateList}
                />
                <button type='button' className="plateModal__button button button--whit" onClick={(e) => closeModal()}>Отмена</button>
                <button id='in' type='button' className="plateModal__button button button--blue" onClick={(e) => { handleAcceptClick(e) }}>Подтвердить</button>
            </div>
            {/* {error && <div>{error}</div>} */}
            {error === '' && <span className="status">&nbsp;</span>}
            {error !== '' && <span className="status status--warning status--left">{error}</span>}
        </>
    );
};