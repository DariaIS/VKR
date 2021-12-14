import React, { useState, useEffect } from "react";
import Axios from "axios";

function SignIn() {

    // const [usernameReg, setUsernameReg] = useState('');
    // const [passwordReg, setPasswordReg] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loginStatus, setLoginStatus] = useState('');

    Axios.defaults.withCredentials = true;

    // const register = () => {
    //     Axios.post('http://localhost:3001/register', {
    //         username: usernameReg, 
    //         password: passwordReg
    //     }).then((response) => {
    //         console.log(response);
    //     });
    // };

    const login = () => {
        Axios.post('http://localhost:3001/login', {
            username: username, 
            password: password
        }).then((response) => {
            if (response.data.message)
                setLoginStatus(response.data.message);
            else setLoginStatus(response.data[0].username);
        });
    };

    useEffect(() => {
        Axios.get('http://localhost:3001/login').then((response) => {
            console.log(response);
            if (response.data.loggedIn == true) {
                setLoginStatus(response.data.user[0].username);
            }
        });
    }, []);

    return (
        <div className="signin container">
            <div className="signin__logo">
                <span>Пропускная</span>
                <span>Система</span>
            </div>
            <div className="signin__forms">
                {/* <form className="signin__form form">
                    <label className="form__item">
                        <input className="input input--small input--default" placeholder="Имя пользователя" type="text" name="name" 
                            onChange={(e) => {
                                setUsernameReg(e.target.value);
                            }}
                        />
                    </label>
                    <label className="form__item">
                        <input className="input input--small input--default" placeholder="Пароль" type="password" name="password"
                            onChange={(e) => {
                                setPasswordReg(e.target.value);
                            }}
                        />
                    </label>
                    <button type='button' className="button" onClick={register}>Зарегистрироваться</button>
                </form> */}
                <form className="signin__form form">
                    <label className="form__item">
                        <input className="input input--small input--default" placeholder="Имя пользователя" type="text" name="name"
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                    </label>
                    <label className="form__item">
                        <input className="input input--small input--default" placeholder="Пароль" type="password" name="password"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </label>
                    <button type='button' className="button signin__button" onClick={login}>Войти</button>
                    <span className="signin__status">{loginStatus}</span>
                </form>
            </div>
        </div>
    );
}

export default SignIn;