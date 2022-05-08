import React, { useEffect } from 'react';

import Select from 'react-select';

import { usePlateModal } from './hooks/usePlateModal';

export const PlateModal = ({ closeModal }) => {
    const { plates, getPlates } = usePlateModal();

    useEffect(() => {
        console.log('PlateModal')
        getPlates();
    }, [getPlates]);

    return (
        <>
            <p className='plateModal__text'>
                Номер автообиля не распознан!
                {'\n'}
                Пожалуйста, введите его вручную.
            </p>
            <label className="plateModal__form form__item">
                <Select className="plateModal__select"
                    // onChange={this.handleChange}
                    options={plates}
                />
            </label>
            <button type='button' className="plateModal__button button button--blue signin__button" onClick={() => { closeModal(); }}>Подтвердить</button>
            {/* {error && <div>{error}</div>} */}
        </>
    );
};