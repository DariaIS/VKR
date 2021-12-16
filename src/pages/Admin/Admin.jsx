import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function Admin() {

    const [plateAdd, setPlateAdd] = useState('');
    const [brandAdd, setBrandAdd] = useState('');
    const [nameAdd, setNameAdd] = useState('');
    const [chairAdd, setChairAdd] = useState('');
    const [gatesAdd, setGatesAdd] = useState('');
    const [spaceAdd, setSpaceAdd] = useState('');

    const add = () => {
        Axios.post('http://localhost:3001/add', {
            plate: plateAdd, 
            brand: brandAdd,
            name: nameAdd,
            chair: chairAdd,
            gates: gatesAdd,
            space: spaceAdd
        }).then((response) => {
            console.log(response);
        });
    };

    return (
        <div className="admin section container">
            <h1 className="title">Вы вошли как администратор</h1>
            <form className="form">
                <div className='admin__form'>
                    <label className="admin__item form__item">
                        <input className="input input--small input--default" placeholder="Номер машины" type="text" name="name"
                            onChange={(e) => {
                                setPlateAdd(e.target.value);
                            }}
                        />
                    </label>
                    <label className="admin__item form__item">
                        <input className="input input--small input--default" placeholder="Марка машины" type="text" name="password"
                            onChange={(e) => {
                                setBrandAdd(e.target.value);
                            }}
                        />
                    </label>
                    <label className="admin__item form__item">
                        <input className="input input--small input--default" placeholder="ФИО" type="text" name="password"
                            onChange={(e) => {
                                setNameAdd(e.target.value);
                            }}
                        />
                    </label>
                    <label className="admin__item form__item">
                        <input className="input input--small input--default" placeholder="Кафедра" type="text" name="password"
                            onChange={(e) => {
                                setChairAdd(e.target.value);
                            }}
                        />
                    </label>
                    <label className="admin__item form__item">
                        <input className="input input--small input--default" placeholder="Ворота" type="text" name="password"
                            onChange={(e) => {
                                setGatesAdd(e.target.value);
                            }}
                        />
                    </label>
                    <label className="admin__item form__item">
                        <input className="input input--small input--default" placeholder="Парковочное место" type="text" name="password"
                            onChange={(e) => {
                                setSpaceAdd(e.target.value);
                            }}
                        />
                    </label>
                </div>
                <div className="admin__button">
                    <button type='button' className="button signin__button" onClick={add}>Войти</button>
                </div>
            </form>
        </div>
    );
}

export default Admin;