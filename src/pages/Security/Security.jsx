import React, { useState, useEffect } from 'react';
import Axios from 'axios';

import { Header } from '../../components';
import { SecurityNavigation } from './SecurityNavigation';

export const Security = () => {

    const [carStatus, setCarStatus] = useState('');
    const [carWarningStatus, setCarWarningStatus] = useState('');

    const [CarDirection, setCarDirection] = useState('');
    const [inOutLog, setInOutLog] = useState('');
    const [logScroll, setLogScroll] = useState('');

    useEffect(() => {
        Axios.get('http://localhost:3001/inOutLog').then((response) => {
            // console.log(response.data.result);
            setInOutLog(response.data.log);

            // logScroll.scrollTop = logScroll.scrollHeight;
        });

        let logBlock = document.getElementsByClassName('security__log')[0];
        logBlock.scrollTop = logBlock.scrollHeight
        setLogScroll(logBlock);
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
                else {
                    setCarWarningStatus(response.data.message);
                    setCarStatus('');
                }
            logScroll.scrollTop = logScroll.scrollHeight;
        });
    }

    return (
        <>
            <Header>
                <SecurityNavigation />
            </Header>
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
                        {
                            Object.values(inOutLog).map(val => {
                                return (
                                    <p key={Math.random()}>{val}</p>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>

    );
}