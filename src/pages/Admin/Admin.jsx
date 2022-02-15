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
                    <label className="admin__form-item form__item">
                        <input className="input input--medium input--default" placeholder="Номер проходной" type="text" name="gates"
                            onChange={(e) => {
                                setGatesAdd(e.target.value);
                            }}
                        />
                    </label>
                    <label className="admin__form-item form__item">
                        <input className="input input--medium input--default" placeholder="Номер машины" type="text" name="plate"
                            onChange={(e) => {
                                setPlateAdd(e.target.value);
                            }}
                        />
                    </label>
                    <label className="admin__form-item form__item">
                        <input className="input input--medium input--default" placeholder="Регион" type="text" name="region"
                            onChange={(e) => {
                                setRegionAdd(e.target.value);
                            }}
                        />
                    </label>
                    <label className="admin__form-item form__item">
                        <input className="input input--medium input--default" placeholder="Марка машины" type="text" name="brand"
                            onChange={(e) => {
                                setBrandAdd(e.target.value);
                            }}
                        />
                    </label>
                    <label className="admin__form-item form__item">
                        <input className="input input--medium input--default" placeholder="Фамилия" type="text" name="lastName"
                            onChange={(e) => {
                                setLastNameAdd(e.target.value);
                            }}
                        />
                    </label>
                    <label className="admin__form-item form__item">
                        <input className="input input--medium input--default" placeholder="Имя" type="text" name="name"
                            onChange={(e) => {
                                setNameAdd(e.target.value);
                            }}
                        />
                    </label>
                    <label className="admin__form-item form__item">
                        <input className="input input--medium input--default" placeholder="Отчество" type="text" name="middleName"
                            onChange={(e) => {
                                setMiddleNameAdd(e.target.value);
                            }}
                        />
                    </label>
                    <label className="admin__form-item form__item">
                        <input className="input input--medium input--default" placeholder="Кафедра" type="text" name="chair"
                            onChange={(e) => {
                                setChairAdd(e.target.value);
                            }}
                        />
                    </label>
                    <div className="admin__radio"                             
                        onChange={(e) => {
                            setPositionAdd(e.target.value);
                        }}>

                        <input type="radio" value="student" name="position" /> Студент
                        <input type="radio" value="academic" name="position" /> Преподаватель, сотрудник администрации и др.
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