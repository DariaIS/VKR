import React from 'react';

import { useModalRename } from './hooks/useModalRename';

export const ModalRename = ({ file }) => {
    const { handleChangeName, clickRename, error } = useModalRename();

    return (
        <>
            <label className="form__item">
                <input className="input input--medium input--default" type="text" name="plate"
                    onChange={handleChangeName}
                />
            </label>
            <button type='button' className="button button--blue signin__button" onClick={() => clickRename(file)}>Change</button>
            {error && <div>{error}</div>}
        </>
    );
};