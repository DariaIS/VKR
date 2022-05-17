import React from 'react';

import { useAddUser } from './hooks/useAddUser';

export const AddUserContent = () => {
    const {
        handleInput,
        addUser,
        error,
        success
    } = useAddUser();

    return (
        <div className="addUser container">
            <div className="addUser__forms section">
                <span className="addUser__title admin__title--section title title--medium">Добавление нового пользователя</span>
                <form className='addUser__form'>
                    <label className="addUser__form-item form__item">
                        <input className="input input--medium input--default" type="text" name="userName"
                            onChange={(e) => handleInput(e)} />
                        <span className="input__name">Имя пользователя</span>
                    </label>

                    <label className="addUser__form-item form__item">
                        <input className="input input--medium input--default" type="text" name="password"
                            onChange={(e) => handleInput(e)} />
                        <span className="input__name">Пароль</span>
                    </label>

                    <div className="addUser__radio"
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
                <div className="addUser__add-result">
                    <button type='button' className="button button--blue signin__button" onClick={addUser}>Добавить пользователя</button>
                    {error !== '' && <span className="status status--warning status--center">{error}</span>}
                    {success !== '' && <span className="status status--success status--center">{success}</span>}
                </div>
            </div>
        </div>
    )
}