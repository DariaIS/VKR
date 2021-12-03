import React, { useState } from "react";

function SignIn() {

    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

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
                <input className="input__submit" type="submit" value="Войти" />
            </form>
        </div>
    );
}

export default SignIn;