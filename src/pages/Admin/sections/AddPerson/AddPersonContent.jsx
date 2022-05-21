import React from 'react';

import { useAddPerson } from './hooks/useAddPerson';

export const AddPersonContent = () => {
    const {
        handleInput,
        handleAcceptClick,
        error,
        success
    } = useAddPerson();

    return (
        <div className="user container">
            <div className="user__forms section">
                <span className="user__title admin__title--section title title--medium">Добавление нового пользователя</span>
                <form className='user__form'>
                    <label className="user__form-item form__item">
                        <input className="input input--medium input--default" type="text" name="userName"
                            onChange={(e) => handleInput(e)} />
                        <span className="input__name">Имя пользователя</span>
                    </label>

                    <label className="user__form-item form__item">
                        <input className="input input--medium input--default" type="text" name="password"
                            onChange={(e) => handleInput(e)} />
                        <span className="input__name">Пароль</span>
                    </label>

                    <div className="user__radio"
                        onChange={(e) => handleInput(e)}>
                        <label>
                            <input type="radio" value="admin" name="role" />
                            Администратор
                        </label>
                        <label>
                            <input type="radio" value="security" name="role" />
                            Сотрудник охраны
                        </label>
                        <label>
                            <input type="radio" value="analyst" name="role" />
                            Аналитик
                        </label>
                    </div>
                </form>
                <div className="user__add-result">
                    <button type='button' className="button button--blue signin__button" onClick={handleAcceptClick}>Добавить пользователя</button>
                    {error !== '' && <span className="status status--warning status--center">{error}</span>}
                    {success !== '' && <span className="status status--success status--center">{success}</span>}
                </div>
            </div>
        </div>
    )
}