import React from 'react';

import { useModalRename } from './hooks/useModalRename';

export const ModalRename = ({ modalData }) => {
    const { handleChangeName, clickRename } = useModalRename();

    return (
        <div>
            <label className="form__item">
                <input className="input input--medium input--default" type="text" name="plate"
                    onChange={handleChangeName}
                />
            </label>
            <button type='button' className="button button--blue signin__button" onClick={clickRename(modalData.path)}>Change</button>
        </div>
    );
};