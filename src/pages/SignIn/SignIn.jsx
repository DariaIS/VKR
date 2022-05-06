import React, { useEffect } from 'react';
import Axios from 'axios';

import { ReactComponent as Show } from './icons/eye.svg';
import { ReactComponent as Hide } from './icons/eye-blind.svg';

import { useSignIn } from './hooks/useSignIn';

export const SignIn = () => {

    const {
        login,
        handleInputChange,
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        navigate,
        error
    } = useSignIn();

    Axios.defaults.withCredentials = true;
    useEffect(() => {
        console.log('signin')
        Axios.get('http://localhost:3001/login').then((response) => {
            console.log(response.data)
            if (response.data.loggedIn) {
                return navigate('/home');
            }
        });
    }, [navigate]);

    return (
        <div className="signin container">
            <div className="signin__logo">
                <span>Пропускная</span>
                <span>Система</span>
            </div>
            <div className="signin__forms">
                <form className="signin__form form">
                    <label className="signin__form-item form__item">
                        <input className="input input--small input--default" placeholder="Имя пользователя" type="text" name="name"
                            onChange={(e) => handleInputChange(e)}
                        />
                    </label>
                    <label className="signin__form-item form__item">
                        <input className="input input--small input--default" placeholder="Пароль" type={showPassword ? "text" : "password"} name="password"
                            onChange={(e) => handleInputChange(e)}
                        />
                        <span onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                            {showPassword ? <Show className="signin__eye-icon" /> : <Hide className="signin__eye-icon" />}
                        </span>
                    </label>
                    <button type='button' className="button button--blue signin__button" onClick={(e) => login(e)}>Войти</button>
                    {error !== '' && <span className="status status--warning">{error}</span>}
                </form>
            </div>
        </div>
    );
}