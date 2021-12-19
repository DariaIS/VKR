import React, { useState } from 'react';
import Axios from 'axios';

function Security() {

    const [carStatus, setCarStatus] = useState('');
    const [carWarningStatus, setCarWarningStatus] = useState('');

    const car = () => {
        Axios.get('http://localhost:3001/car').then((response) => {
            if (response.data.message)
                if (response.data.message === 'Машина может быть пропущена!') {
                    setCarStatus(response.data.message);
                    setCarWarningStatus('');
                }
                else  {
                    setCarWarningStatus(response.data.message);
                    setCarStatus('');
                }
        });
    }

    return (
        <div className="security section container">
            <span className="security__title title title--medium">Вы вошли как охрана</span>
            <span className="security__text">Пропускная 7-ого корпуса</span>

            <div className="security__car-result">
                <button type='button' className="button signin__button" onClick={car}>Машина подъехала</button>
                <span className="warning-status">{carWarningStatus}</span>
                <span className="status">{carStatus}</span>
            </div>
        </div>
    );
}

export default Security;