import React, { useState } from "react";
import Axios from "axios";

function SignIn() {

    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const register = () => {
        Axios.post('http://localhost:3001/register', {
            username: usernameReg, 
            password: passwordReg
        }).then((response) => {
            console.log(response);
        });
    };

    return (
        <div className="signin container">
            <div className="signin__logo">
                <span>Пропускная</span>
                <span>Система</span>
            </div>
            <form className="signin__form form">
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
                <input className="input__submit" type="submit" value="Войти" onClick={register}/>
            </form>
        </div>
    );
}

export default SignIn;