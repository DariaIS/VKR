import React, { useState } from 'react';
import Axios from 'axios';

function Admin() {

    const [plateAdd, setPlateAdd] = useState('');
    const [brandAdd, setBrandAdd] = useState('');
    const [nameAdd, setNameAdd] = useState('');
    const [chairAdd, setChairAdd] = useState('');
    const [gatesAdd, setGatesAdd] = useState('');
    const [spaceAdd, setSpaceAdd] = useState('');


    const [addStatus, setAddStatus] = useState('');
    const [addWarningStatus, setAddWarningStatus] = useState('');


    const add = () => {
        Axios.post('http://localhost:3001/add', {
            plate: plateAdd, 
            brand: brandAdd,
            name: nameAdd,
            chair: chairAdd,
            gates: gatesAdd,
            space: spaceAdd
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
                        <input className="input input--medium input--default" placeholder="Номер машины" type="text" name="plate"
                            onChange={(e) => {
                                setPlateAdd(e.target.value);
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
                        <input className="input input--medium input--default" placeholder="ФИО" type="text" name="fio"
                            onChange={(e) => {
                                setNameAdd(e.target.value);
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
                    <label className="admin__form-item form__item">
                        <input className="input input--medium input--default" placeholder="Номер проходной" type="text" name="gates"
                            onChange={(e) => {
                                setGatesAdd(e.target.value);
                            }}
                        />
                    </label>
                    <label className="admin__form-item form__item">
                        <input className="input input--medium input--default" placeholder="Парковочное место" type="text" name="space"
                            onChange={(e) => {
                                setSpaceAdd(e.target.value);
                            }}
                        />
                    </label>
                </div>
                <div className="admin__add-result">
                    <button type='button' className="button signin__button" onClick={add}>Добавить запись</button>
                    <span className="warning-status">{addWarningStatus}</span>
                    <span className="status">{addStatus}</span>
                </div>
            </form>
        </div>
    );
}

export default Admin;