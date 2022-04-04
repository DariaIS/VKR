import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import sda from '../../js/fileManager/getfileList'

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

    const [addCarStatus, setAddCarStatus] = useState('');
    const [addCarWarningStatus, setAddCarWarningStatus] = useState('');


    const [userNameAdd, setUserNameAdd] = useState('');
    const [passwordAdd, setPasswordAdd] = useState('');
    const [roleAdd, setRoleAdd] = useState('');

    const [addUserStatus, setAddUserStatus] = useState('');
    const [addUserWarningStatus, setAddUserWarningStatus] = useState('');

    useEffect(() => {
        const getfileList = document.createElement('getfileList');
        const uplouder = document.createElement('uplouder');
      
        getfileList.src = '../../js/fileManager/getfileList';
        getfileList.async = true;
        
        uplouder.src = "../../js/fileManager/uplouder";
        uplouder.async = true;
      
        document.body.appendChild(getfileList);
        document.body.appendChild(uplouder);
      
        return () => {
          document.body.removeChild(getfileList);
          document.body.removeChild(uplouder);
        }
      }, []);

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

            <div>
                <div class="tab">
                    <button className="tablinks" onclick="openTab(event, 'fileuploader'); getListOfFiles('file', 'fileholder', 'loadinggif'); document.getElementById('viewoptions').style.display = 'none';">file</button>
                    <button className="tablinks" onclick="openTab(event, 'fontuploader'); getListOfFiles('font', 'fileholder', 'loadinggif'); document.getElementById('viewoptions').style.display = 'none';">font</button>
                    <button className="tablinks" onclick="openTab(event, 'htmluploader'); getListOfFiles('html', 'fileholder', 'loadinggif'); document.getElementById('viewoptions').style.display = 'none';">html</button>
                    <button className="tablinks" onclick="openTab(event, 'imageuploader'); getListOfFiles('image', 'fileholder', 'loadinggif'); document.getElementById('viewoptions').style.display = 'block';">image</button>
                    <button className="tablinks" onclick="openTab(event, 'pdfuploader'); getListOfFiles('pdf', 'fileholder', 'loadinggif'); document.getElementById('viewoptions').style.display = 'none';">pdf</button>
                    <button className="tablinks" onclick="openTab(event, 'videouploader'); getListOfFiles('video', 'fileholder', 'loadinggif'); document.getElementById('viewoptions').style.display = 'none';">video</button>

                    <div id="viewoptions">
                        <form>
                            View options:
                            <input type="radio" name="viewoption" value="details" onclick="replaceClassName('tile', 'details')" checked/>Details
                            <input type="radio" name="viewoption" value="tile" onclick="replaceClassName('details', 'tile')"/>Tile
                        </form>
                    </div>
                </div>

                <div id="progressBar"></div>

                <div id="fontuploader" class="tabcontent">
                    <p><b>font</b></p>
                    <form id="form_fontUpload" method="POST" action="/?type=font" enctype="multipart/form-data">
                        <input type="file" name="file" accept=".ttf, .otf" required/>
                        <input type="button" onclick="uploadToServer(document.getElementById('form_fontUpload'), document.getElementById('progressBar'))" value="Upload"/>
                    </form>
                </div>

                <div id="htmluploader" class="tabcontent">
                    <p><b>html</b></p>
                    <form id="form_htmlUpload" method="POST" action="/?type=html" enctype="multipart/form-data">
                        <input type="file" name="file" accept="text/html, text/htm" required/>
                        <input type="button" onclick="uploadToServer(document.getElementById('form_htmlUpload'), document.getElementById('progressBar'))" value="Upload"/>
                    </form>
                </div>

                <div id="imageuploader" class="tabcontent">
                    <p><b>image</b></p>
                    <form id="form_imageUpload" method="POST" action="/?type=image" enctype="multipart/form-data">
                        <input type="file" name="file" accept="image/*" required/>
                        <input type="button" onclick="uploadToServer(document.getElementById('form_imageUpload'), document.getElementById('progressBar'))" value="Upload"/>
                    </form>
                </div>

                <div id="pdfuploader" class="tabcontent">
                    <p><b>pdf</b></p>
                    <form id="form_pdfUpload" method="POST" action="/?type=pdf" enctype="multipart/form-data">
                        <input type="file" name="file" accept="application/pdf" required/>
                        <input type="button" onclick="uploadToServer(document.getElementById('form_pdfUpload'), document.getElementById('progressBar'))" value="Upload"/>
                    </form>
                </div>

                <div id="videouploader" class="tabcontent">
                    <p><b>video</b></p>
                    <form id="form_videoUpload" method="POST" action="/?type=video" enctype="multipart/form-data">
                        <input type="file" name="file" accept="video/*" required/>
                        <input type="button" onclick="uploadToServer(document.getElementById('form_videoUpload'), document.getElementById('progressBar'))" value="Upload"/>
                    </form>
                </div>

                <div><img id="loadinggif" src="/img/200.gif" alt="Loading Files..."/></div>

                <div class="fileholder" id="fileholder"></div>
            </div>
        </div>
    );
}

export default Admin;