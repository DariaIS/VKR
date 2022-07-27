import React, { useEffect } from 'react';
import Axios from 'axios';

import { Modal } from "../../components/Modal";

import { useSecurity } from './hooks/useSecurity';

export const SecurityContent = () => {
    const {
        inOutLog,
        setInOutLog,
        setLogScroll,
        direction,
        isModalOpen,
        clickCloseModal,
        inOut,
        error,
        success
    } = useSecurity();

    useEffect(() => {
        console.log('SecurityContent');
        Axios.get('http://localhost:3001/inOutLog').then((response) => {
            console.log(response.data)
            setInOutLog(response.data.log);

            let logBlock = document.getElementsByClassName('security__log')[0];
            logBlock.scrollTop = logBlock.scrollHeight;
            setLogScroll(logBlock);
        });
    }, [setInOutLog, setLogScroll]);

    return (
        <>
            <div className="security section container">
                <div className="security__car-result">
                    <span className="security__title title title--medium">Вы вошли как охрана</span>
                    <span className="security__text">Пропускная 7-ого корпуса</span>
                    <button id='in' type='button' className="button button--blue security__button"
                        onClick={(e) => inOut(e.target.id, '')}>
                        Автомобиль въезжает
                    </button>
                    <button id='out' type='button' className="button button--white security__button"
                        onClick={(e) => inOut(e.target.id, '')}>
                        Автомобиль выезжает
                    </button>
                    {(error === '' && success === '') && <span className="status">&nbsp;</span>}
                    {/* {(error === '' && success === '') && <span className="status">&nbsp;</span>} */}
                    {error !== '' && <span className="status status--warning status--center">{error}</span>}
                    {success !== '' && <span className="status status--success status--center">{success}</span>}
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
            {isModalOpen && <Modal isModalOpen={isModalOpen} clickCloseModal={clickCloseModal} modalData={{modalType: 'plate', accept: inOut, direction: direction}}/>}
        </>
    );
}