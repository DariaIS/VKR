import { useState } from 'react';
import Axios from 'axios';

export const useSecurity = () => {

    const [inOutLog, setInOutLog] = useState('');
    const [logScroll, setLogScroll] = useState('');

    const [isModalOpen, SetIsModalOpen] = useState(false);
    
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const clickOpenModal = (data) => {
        SetIsModalOpen(true);
    }

    const clickCloseModal = () => {
        SetIsModalOpen(false);
    }

    const inOut = (direction, plate) => {
        setError('');
        setSuccess('');
        Axios.post(`http://localhost:3001/inOutCar?plate=${plate}`, {
            direction: direction
        }).then((response) => {
            setInOutLog(response.data.log)
            if (response.data.message) {
                setSuccess(response.data.message);
                setError('');
            }
            else if (response.data.err) {
                setError(response.data.err);
                setSuccess('');
            }
            // else if (response.data.carPlateErr && direction === 'in') {
            else if (response.data.carPlateErr) {
                clickOpenModal();
            }
            logScroll.scrollTop = logScroll.scrollHeight;
        });
    }

    return {
        inOutLog,
        setInOutLog,
        setLogScroll,
        isModalOpen,
        clickCloseModal,
        inOut,
        error,
        success
    };
}