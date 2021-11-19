import React from "react";

function SignIn() {
    return (
        <div className="signin container">
            <div className="signin__logo">
                <span>Пропускная</span>
                <span>Система</span>
            </div>
            <form className="signin__form form">
                <label className="form__item">
                    <input className="input input--small input--default" placeholder="Имя пользователя" type="text" name="name" />
                </label>
                <label className="form__item">
                    <input className="input input--small input--default" placeholder="Пароль" type="password" name="password" />
                </label>
                <input className="input__submit" type="submit" value="Отправить" />
            </form>
        </div>
    );
}

export default SignIn;