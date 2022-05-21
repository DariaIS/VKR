import React from 'react';

import { useDeleteUser } from './hooks/useDeleteUser';

export const DeleteUserContent = () => {
    const {
        handleInput,
        handleAcceptClick,
        error,
        success
    } = useDeleteUser();

    return (
        <div className="user container section">
            <span className="user__title admin__title--section title title--medium">Удаление пользователя</span>
            <form className='user__form'>
                <label className="user__form-item form__item">
                    <input className="input input--medium input--default" type="text" name="userName"
                        onChange={(e) => handleInput(e)} />
                    <span className="input__name">Имя пользователя</span>
                </label>

                <label className="user__form-item form__item">
                    <input className="input input--medium input--default" type="text" name="password"
                        onChange={(e) => handleInput(e)} />
                    <span className="input__name">Пароль вашей учетной записи</span>
                </label>
            </form>
            <div className="user__add-result">
                <button type='button' className="button button--blue signin__button" onClick={handleAcceptClick}>Удалить пользователя</button>
                {error !== '' && <span className="status status--warning status--center">{error}</span>}
                {success !== '' && <span className="status status--success status--center">{success}</span>}
            </div>
        </div>
    )
}