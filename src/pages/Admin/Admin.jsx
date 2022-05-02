import React, { useState } from 'react';
import Axios from 'axios';

import { Header } from '../../components/index';
import { Navigation } from './Navigation/index';

export const Admin = () => {

    const [plateAdd, setPlateAdd] = useState('');
    const [regionAdd, setRegionAdd] = useState('');
    const [brandAdd, setBrandAdd] = useState('');
    const [lastNameAdd, setLastNameAdd] = useState('');
    const [nameAdd, setNameAdd] = useState('');
    const [middleNameAdd, setMiddleNameAdd] = useState('');
    const [chairAdd, setChairAdd] = useState('');
    const [positionAdd, setPositionAdd] = useState('');
    const [gatesAdd, setGatesAdd] = useState('');

    const [addCarStatus, setAddCarStatus] = useState('');
    const [addCarWarningStatus, setAddCarWarningStatus] = useState('');


    const [userNameAdd, setUserNameAdd] = useState('');
    const [passwordAdd, setPasswordAdd] = useState('');
    const [roleAdd, setRoleAdd] = useState('');

    const [addUserStatus, setAddUserStatus] = useState('');
    const [addUserWarningStatus, setAddUserWarningStatus] = useState('');


    const addCar = (e) => {
        Axios.post('http://localhost:3001/addCar', {
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
                    setAddCarStatus(response.data.message);
                    setAddCarWarningStatus('');
                }
                else  {
                    setAddCarWarningStatus(response.data.message);
                    setAddCarStatus('');
                }
        });
        e.preventDefault();
    };

    const addUser = (e) => {
        Axios.post('http://localhost:3001/addUser', {
            userName: userNameAdd, 
            password: passwordAdd,
            role: roleAdd

        }).then((response) => {            
            if (response.data.message)
                if (response.data.message === 'Пользователь успешно добавлен!') {
                    setAddUserStatus(response.data.message);
                    setAddUserWarningStatus('');
                }
                else  {
                    setAddUserWarningStatus(response.data.message);
                    setAddUserStatus('');
                }
        });
        e.preventDefault();
    };

    return (
        <>
            <Header>
                <Navigation/>
            </Header>
            <div className="admin container">
                <span className="admin__title admin__title--main title title--medium">Вы вошли как администратор</span>
                <div className="admin__forms section">
                    <span className="admin__title admin__title--section title title--small">Добавление новой записи</span>
                    <form className='admin__car-form'>
                        <label className="admin__form-item form__item">
                            <input className="input input--medium input--default" type="text" name="plate"
                                onChange={(e) => {
                                    setPlateAdd(e.target.value);
                                }}
                            />
                            <span className="input__name">Номер машины</span>
                        </label>

                        <label className="admin__form-item form__item">
                            <input className="input input--medium input--default" type="text" name="region"
                                onChange={(e) => {
                                    setRegionAdd(e.target.value);
                                }}
                            />
                            <span className="input__name">Регион</span>
                        </label>

                        <label className="admin__form-item form__item">
                            <input className="input input--medium input--default" type="text" name="brand"
                                onChange={(e) => {
                                    setBrandAdd(e.target.value);
                                }}
                            />
                            <span className="input__name">Марка машины</span>
                        </label>

                        <label className="admin__form-item form__item">
                            <input className="input input--medium input--default" type="text" name="lastName"
                                onChange={(e) => {
                                    setLastNameAdd(e.target.value);
                                }}
                            />
                            <span className="input__name">Фамилия</span>
                        </label>

                        <label className="admin__form-item form__item">
                            <input className="input input--medium input--default" type="text" name="name"
                                onChange={(e) => {
                                    setNameAdd(e.target.value);
                                }}
                            />
                            <span className="input__name">Имя</span>
                        </label>

                        <label className="admin__form-item form__item">
                            <input className="input input--medium input--default" type="text" name="middleName"
                                onChange={(e) => {
                                    setMiddleNameAdd(e.target.value);
                                }}
                            />
                            <span className="input__name">Отчество</span>
                        </label>

                        <label className="admin__form-item form__item">
                            <input className="input input--medium input--default" type="text" name="chair"
                                onChange={(e) => {
                                    setChairAdd(e.target.value);
                                }}
                            />
                            <span className="input__name">Кафедра</span>
                        </label>

                        <label className="admin__form-item form__item">
                            <input className="input input--medium input--default" type="text" name="gates"
                                onChange={(e) => {
                                    setGatesAdd(e.target.value);
                                }}
                            />
                            <span className="input__name">Номер проходной</span>
                        </label>

                        <div className="admin__radio"                             
                            onChange={(e) => {
                                setPositionAdd(e.target.value);
                            }}>
                                <label>
                                    <input type="radio" value="student" name="position"/>
                                    Студент
                                </label>
                                <label>
                                    <input type="radio" value="academic" name="position"/>
                                    Преподаватель, сотрудник и др.
                                </label>
                        </div>
                    </form>
                    <div className="admin__add-result">
                        <button type='button' className="button button--blue signin__button" onClick={addCar}>Добавить запись</button>
                        <span className="status status--warning">{addCarWarningStatus}</span>
                        <span className="status status--success">{addCarStatus}</span>
                    </div>
                </div>
                <div className="admin__forms section">
                    <span className="admin__title admin__title--section title title--small">Добавление нового пользователя</span>
                    <form className='admin__user-form'>
                        <label className="admin__form-item form__item">
                            <input className="input input--medium input--default" type="text" name="name"
                                onChange={(e) => {
                                    setUserNameAdd(e.target.value);
                                }}
                            />
                            <span className="input__name">Имя пользователя</span>
                        </label>

                        <label className="admin__form-item form__item">
                            <input className="input input--medium input--default" type="text" name="password"
                                onChange={(e) => {
                                    setPasswordAdd(e.target.value);
                                }}
                            />
                            <span className="input__name">Пароль</span>
                        </label>

                        <div className="admin__radio"                             
                            onChange={(e) => {
                                setRoleAdd(e.target.value);
                            }}>
                                <label>
                                    <input type="radio" value="admin" name="role"/>
                                    Администратор
                                </label>
                                <label>
                                    <input type="radio" value="security" name="role"/>
                                    Сотрудник охраны
                                </label>
                                <label>
                                    <input type="radio" value="analyst" name="role"/>
                                    Аналитик
                                </label>
                        </div>
                    </form>
                    <div className="admin__add-result">
                        <button type='button' className="button button--blue signin__button" onClick={addUser}>Добавить пользователя</button>
                        <span className="status status--warning">{addUserWarningStatus}</span>
                        <span className="status status--success">{addUserStatus}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Admin;