import React, { useEffect } from 'react';
import Axios from 'axios';

import { Header } from '../../components';
import { Modal } from "../../components/Modal";

import { useSecurity } from './hooks/useSecurity';

export const Security = () => {
    const {
        inOutLog,
        setInOutLog,
        setLogScroll,
        isModalOpen,
        clickCloseModal,
        inOut,
        error,
        success
    } = useSecurity();

    useEffect(() => {
        Axios.get('http://localhost:3001/inOutLog').then((response) => {
            console.log(response.data)
            setInOutLog(response.data.log);

            let logBlock = document.getElementsByClassName('security__log')[0];
            logBlock.scrollTop = logBlock.scrollHeight;
            console.log('sc')
            setLogScroll(logBlock);
        });
    }, [setInOutLog, setLogScroll]);

    return (
        <>
            <Header />
            <div className="security section container">
                <div className="security__car-result">
                    <span className="security__title title title--medium">Вы вошли как охрана</span>
                    <span className="security__text">Пропускная 7-ого корпуса</span>
                    <button id='in' type='button' className="button button--blue security__button"
                        onClick={(e) => inOut(e, '')}>
                        Автомобиль въезжает
                    </button>
                    <button id='out' type='button' className="button button--white security__button"
                        onClick={(e) => inOut(e, '')}>
                        Автомобиль выезжает
                    </button>
                    {(error === '' && success === '') && <span className="status">&nbsp;</span>}
                    {error !== '' && <span className="status status--warning">{error}</span>}
                    {success !== '' && <span className="status status--success">{success}</span>}
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
            {isModalOpen && <Modal isModalOpen={isModalOpen} clickCloseModal={clickCloseModal} modalType='plate'/>}
        </>

    );
}