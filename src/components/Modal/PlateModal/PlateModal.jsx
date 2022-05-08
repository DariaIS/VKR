import React from 'react';

import { usePlateModal } from './hooks/usePlateModal';

export const PlateModal = ({ closeModal }) => {
    // const { handlePlate, clickPlate, error } = usePlateModal();

    return (
        <>
            <p className='plateModal__text'>
                Номер автообиля не распознан!
                {'\n'}
                Пожалуйста, введите его вручную.
            </p>
            <label className="plateModal__form form__item">
                <input className=" input input--medium input--default" type="text" name="plate"
                // onChange={handlePlate}
                />
            </label>
            <button type='button' className="plateModal__button button button--blue signin__button" onClick={() => { closeModal(); }}>Подтвердить</button>
            {/* {error && <div>{error}</div>} */}
        </>
    );
};