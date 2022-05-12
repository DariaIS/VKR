import React, { useEffect } from 'react';

import Select from 'react-select';

import { usePlateModal } from './hooks/usePlateModal';

export const ChangeDataModal = ({ closeModal, accept, plate }) => {
    const {
        handleInputChange,
        handleSelectChange,
        getPlateData,
        plateData,
        handleAcceptClick,
        error
    } = usePlateModal(accept, plate, closeModal);

    useEffect(() => {
        console.log('ChangeDataModal')
    }, []);

    return (
        <>
            <p className='plateModal__text'>
                Номер не распознан! Пожалуйста, введите номер вручную.
                {/* {'\n'} */}
            </p>
            <div className='plateModal__elems'>
                {/* <Select className="plateModal__select"
                    onChange={(e) => handleSelectChange(e)}
                    options={}
                /> */}
                <button type='button' className="plateModal__button button button--whit" onClick={closeModal}>Отмена</button>
                <button id='in' type='button' className="plateModal__button button button--blue" onClick={(e) => handleAcceptClick(e)}>Подтвердить</button>
            </div>
            {/* {error && <div>{error}</div>} */}
            {error === '' && <span className="status">&nbsp;</span>}
            {error !== '' && <span className="status status--warning status--left">{error}</span>}
        </>
    );
};