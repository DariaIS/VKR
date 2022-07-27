import { useState } from 'react';
import Axios from 'axios';

export const useSecurity = () => {

    const [inOutLog, setInOutLog] = useState('');
    const [logScroll, setLogScroll] = useState('');
    const [direction, SetDirection] = useState('');

    const [isModalOpen, SetIsModalOpen] = useState(false);
    
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const clickOpenModal = () => {
        SetIsModalOpen(true);
    }

    const clickCloseModal = () => {
        SetIsModalOpen(false);
    }

    const inOut = (dir, plate) => {
        SetDirection(dir);
        setError('');
        setSuccess('');
        Axios.post(`http://localhost:3001/inOutCar?plate=${plate}`, {
            direction: dir
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
        direction,
        isModalOpen,
        clickCloseModal,
        inOut,
        error,
        success
    };
}