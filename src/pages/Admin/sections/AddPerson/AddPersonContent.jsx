import React, { useEffect } from 'react';
import Select from 'react-select';

import { useAddPerson } from './hooks/useAddPerson';

export const AddPersonContent = () => {
    const {
        getChairs,
        chairList,
        handleChairSelect,
        handleInput,
        handleAcceptClick,
        error,
        success
    } = useAddPerson();

    useEffect(() => {
        console.log('getChairsEffect')
        getChairs();
    }, [getChairs]);

    return (
        <div className="addPerson container">
            <div className="addPerson__forms section">
                <span className="addPerson__title admin__title--section title title--medium">Добавление нового пользователя</span>
                <form className='addPerson__form'>
                    <label className="addPerson__form-item form__item">
                        <input className="input input--medium input--default" type="text" name="lastName"
                            onChange={(e) => handleInput(e)} />
                        <span className="input__name">Фамилия</span>
                    </label>

                    <label className="addPerson__form-item form__item">
                        <input className="input input--medium input--default" type="text" name="name"
                            onChange={(e) => handleInput(e)} />
                        <span className="input__name">Имя</span>
                    </label>

                    <label className="addPerson__form-item form__item">
                        <input className="input input--medium input--default" type="text" name="middleName"
                            onChange={(e) => handleInput(e)} />
                        <span className="input__name">Отчетство</span>
                    </label>
                </form>

                <div className="addPerson__dinamic-inputs">
                    <div className="addPerson__radio"
                        onChange={(e) => handleInput(e)}>
                        <label>
                            <input type="radio" value="student" name="position" />
                            Студент
                        </label>
                        <label>
                            <input type="radio" value="academic" name="position" />
                            Сотрудник
                        </label>
                    </div>
                    <Select className="byPerson__select select select--medium"
                        onChange={(e) => handleChairSelect(e)}
                        options={chairList}
                        placeholder='Кафедра'
                        noOptionsMessage={() => 'Кафедра не найдена'}
                    />
                </div>
                <div className="addPerson__add-result">
                    <button type='button' className="button button--blue signin__button" onClick={handleAcceptClick}>Добавить пользователя</button>
                    {error !== '' && <span className="status status--warning status--center">{error}</span>}
                    {success !== '' && <span className="status status--success status--center">{success}</span>}
                </div>
            </div>
        </div>
    )
}