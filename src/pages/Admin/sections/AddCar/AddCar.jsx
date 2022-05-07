import React from 'react';

import { Header } from '../../../../components';
import { AdminNavigation } from '../../AdminNavigation';
import { ProtectedRoute } from '../../../../components/ProtectedRoute';

import { useAddCar } from './hooks/useAddCar';

export const AddCar = () => {
    const { handleInput, addCar, error, success } = useAddCar();

    return (
        <ProtectedRoute role='admin' setNewRole={null}>
            <Header>
                <AdminNavigation />
            </Header>
            <div className="addCar container">
                <div className="addCar__forms section">
                    <span className="addCar__title title title--medium">Добавление новой записи</span>
                    <form className='addCar__form'>
                        <label className="addCar__form-item form__item">
                            <input className="input input--medium input--default" type="text" name="plate"
                                onChange={(e) => handleInput(e)}
                            />
                            <span className="input__name">Номер машины</span>
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
                            <span className="input__name">Марка машины</span>
                        </label>
                    </form>
                    <div className="addCar__add-result">
                        <button type='button' className="button button--blue signin__button" onClick={addCar}>Добавить запись</button>
                        {error !== '' && <span className="status status--warning">{error}</span>}
                        {success !== '' && <span className="status status--success">{success}</span>}
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}