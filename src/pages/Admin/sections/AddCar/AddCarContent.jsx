import React from 'react';

import { useAddCar } from './hooks/useAddCar';

export const AddCarContent = () => {
    const {
        handleInput,
        addCar,
        error,
        success
    } = useAddCar();

    return (
        <div className="addCar container">
            <div className="addCar__forms section">
                <span className="addCar__title title title--medium">Добавление записи об автомобиле</span>
                <span className="addCar__small-title title title--small">Обновление прав доступа и предоставление доступа к проходной седьмого корпуса</span>
                <form className='addCar__form'>
                    <label className="addCar__form-item form__item">
                        <input className="input input--medium input--default" type="text" name="plate"
                            onChange={(e) => handleInput(e)}
                        />
                        <span className="input__name">Номер автомобиля</span>
                    </label>

                    <label className="addCar__form-item form__item">
                        <input className="input input--medium input--default" type="text" name="region"
                            onChange={(e) => handleInput(e)}
                        />
                        <span className="input__name">Регион</span>
                    </label>

                    <label className="addCar__form-item form__item">
                        <input className="input input--medium input--default" type="text" name="brand"
                            onChange={(e) => handleInput(e)}
                        />
                        <span className="input__name">Марка автомобиля</span>
                    </label>
                </form>
                <div className="addCar__add-result">
                    <button type='button' className="button button--blue signin__button" onClick={addCar}>Добавить запись</button>
                    {error !== '' && <span className="status status--warning status--center">{error}</span>}
                    {success !== '' && <span className="status status--success status--center">{success}</span>}
                </div>
            </div>
        </div>
    );
}