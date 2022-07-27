import React from 'react';

import { ReactComponent as Show } from '../../../../../assets/img/icons/eye.svg';
import { ReactComponent as Hide } from '../../../../../assets/img/icons/eye-blind.svg';

import { useDeleteUser } from './hooks/useDeleteUser';

export const DeleteUser = () => {
    const {
        handleInput,
        handleAcceptClick,
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        error,
        success
    } = useDeleteUser();

    return (
        <>
            <span className="user__title admin__title--section title title--medium">Удаление пользователя</span>
            <form className='user__form'>
                <label className="user__form-item form__item">
                    <input className="input input--medium input--default" type="text" name="userName"
                        onChange={(e) => handleInput(e)} />
                    <span className="input__name">Имя пользователя</span>
                </label>

                <label className="user__form-item form__item">
                    <input className="input input--medium input--default" type={showPassword ? "text" : "password"} name="password"
                        onChange={(e) => handleInput(e)} />
                    <span className="input__name">Пароль вашей учетной записи</span>
                    <span onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                        {showPassword ? <Show className="eye-icon" /> : <Hide className="eye-icon" />}
                    </span>
                </label>
            </form>
            <div className="user__add-result">
                <button type='button' className="button button--white signin__button" onClick={handleAcceptClick}>Удалить пользователя</button>
                {error !== '' && <span className="status status--warning status--center">{error}</span>}
                {success !== '' && <span className="status status--success status--center">{success}</span>}
                {(error === '' && success === '') && <span className="status">&nbsp;</span>}
            </div>
        </>
    )
}