import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function Security() {

    const [carStatus, setCarStatus] = useState('');
    const [carWarningStatus, setCarWarningStatus] = useState('');

    const [CarDirection, setCarDirection] = useState('');
    const [inOutLog, setInOutLog] = useState('');

    useEffect(() => {
        Axios.get('http://localhost:3001/inOutLog').then((response) => {
            // console.log(response.data.result);
            setInOutLog(response.data.log);
        });
    }, []);


    const inOutCar = () => {
        console.log(CarDirection)
        Axios.post('http://localhost:3001/InOutCar', {
            direction: CarDirection
        }).then((response) => {
            setInOutLog(response.data.log)
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
            <div className="security__checking">
                <div className="security__car-result">
                <span className="security__title title title--medium">Вы вошли как охрана</span>
                <span className="security__text">Пропускная 7-ого корпуса</span>
                    <button id='in' type='button' className="button button--blue security__button"
                        onClick={(e) => {
                            setCarDirection(e.target.id);
                            inOutCar();
                        }}>
                        Автомобиль въезжает</button>
                    <button id='out' type='button' className="button button--white security__button"
                        onClick={(e) => {
                            setCarDirection(e.target.id);
                            inOutCar();
                        }}>
                        Автомобиль выезжает
                    </button>
                    <span className="status status--warning">{carWarningStatus}</span>
                    <span className="status status--success">{carStatus}</span>
                </div>
                <div className="security__log"> 
                {console.log(typeof inOutLog)}
                {console.log(inOutLog)}
                    {
                        Object.values(inOutLog).map(val => {
                            {console.log(inOutLog.indexOf(val))}
                            return (
                                <p key={Math.random()}>{val}</p>
                            )
                        })
                    }
                    {/* {inOutLog} */}
                </div>
            </div>
        </div>
    );
}

export default Security;