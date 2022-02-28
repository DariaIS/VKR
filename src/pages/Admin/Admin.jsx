import React, { useState } from 'react';
import Axios from 'axios';

function Admin() {

    const [plateAdd, setPlateAdd] = useState('');
    const [regionAdd, setRegionAdd] = useState('');
    const [brandAdd, setBrandAdd] = useState('');
    const [lastNameAdd, setLastNameAdd] = useState('');
    const [nameAdd, setNameAdd] = useState('');
    const [middleNameAdd, setMiddleNameAdd] = useState('');
    const [chairAdd, setChairAdd] = useState('');
    const [positionAdd, setPositionAdd] = useState('');
    const [gatesAdd, setGatesAdd] = useState('');


    const [addStatus, setAddStatus] = useState('');
    const [addWarningStatus, setAddWarningStatus] = useState('');


    const add = () => {
        Axios.post('http://localhost:3001/add', {
            plate: plateAdd, 
            region: regionAdd,
            brand: brandAdd,
            lastName: lastNameAdd,
            name: nameAdd,
            middleName: middleNameAdd,
            chair: chairAdd,
            gates: gatesAdd,
            position: positionAdd

        }).then((response) => {            
            if (response.data.message)
                if (response.data.message === 'Запись успешно добавлена!') {
                    setAddStatus(response.data.message);
                    setAddWarningStatus('');
                }
                else  {
                    setAddWarningStatus(response.data.message);
                    setAddStatus('');

                }
        });
    };

    return (
        <div className="admin section container">
            <span className="admin__title title title--medium">Вы вошли как администратор</span>
            <form className="form">
                <span className="admin__title title title--small">Добавление новой записи</span>
                <div className='admin__forms'>
                    <div className="admin__form-item form__item">
                        <input className="input input--medium input--default" type="text" name="gates" required
                            onChange={(e) => {
                                setGatesAdd(e.target.value);
                            }}
                        />
                        <label className="input__label">Номер проходной</label>
                    </div>

                    <div className="admin__form-item form__item">
                        <input className="input input--medium input--default" type="text" name="plate" required
                            onChange={(e) => {
                                setPlateAdd(e.target.value);
                            }}
                        />
                        <label className="input__label">Номер машины</label>
                    </div>

                    <div className="admin__form-item form__item">
                        <input className="input input--medium input--default" type="text" name="region" required
                            onChange={(e) => {
                                setRegionAdd(e.target.value);
                            }}
                        />
                        <label className="input__label">Регион</label>
                    </div>

                    <div className="admin__form-item form__item">
                        <input className="input input--medium input--default" type="text" name="brand" required
                            onChange={(e) => {
                                setBrandAdd(e.target.value);
                            }}
                        />
                        <label className="input__label">Марка машины</label>
                    </div>

                    <div className="admin__form-item form__item">
                        <input className="input input--medium input--default" type="text" name="lastName" required
                            onChange={(e) => {
                                setLastNameAdd(e.target.value);
                            }}
                        />
                        <label className="input__label">Имя</label>
                    </div>

                    <div className="admin__form-item form__item">
                        <input className="input input--medium input--default" type="text" name="name" required
                            onChange={(e) => {
                                setNameAdd(e.target.value);
                            }}
                        />
                        <label className="input__label">Имя</label>
                    </div>

                    <div className="admin__form-item form__item">
                        <input className="input input--medium input--default" type="text" name="middleName" required
                            onChange={(e) => {
                                setMiddleNameAdd(e.target.value);
                            }}
                        />
                        <label className="input__label">Отчество</label>
                    </div>

                    <div className="admin__form-item form__item">
                        <input className="input input--medium input--default" type="text" name="chair" required
                            onChange={(e) => {
                                setChairAdd(e.target.value);
                            }}
                        />
                        <label className="input__label">Кафедра</label>
                    </div>

                    <div className="admin__radio"                             
                        onChange={(e) => {
                            setPositionAdd(e.target.value);
                        }}>
                        <div>
                            <input type="radio" value="student" name="position" />
                            <label>Студент</label>
                        </div>
                        <div>
                            <input type="radio" value="academic" name="position" />
                            <label>Преподаватель, сотрудник и др.</label>
                        </div>
                    </div>
                </div>
                <div className="admin__add-result">
                    <button type='button' className="button button--blue signin__button" onClick={add}>Добавить запись</button>
                    <span className="status status--warning">{addWarningStatus}</span>
                    <span className="status status--success">{addStatus}</span>
                </div>
            </form>
        </div>
    );
}

export default Admin;