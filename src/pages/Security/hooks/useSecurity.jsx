import { useState } from 'react';
import Axios from 'axios';

export const useSecurity = () => {

    const [inOutLog, setInOutLog] = useState('');
    const [logScroll, setLogScroll] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const inOut = (e, plate) => {
        setError('');
        setSuccess('');
        Axios.post(`http://localhost:3001/inOutCar?plate=${plate}`, {
            direction: e.target.id
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
            else if (response.data.carPlateErr) {
                console.log(response.data.carPlateErr);
            }
            logScroll.scrollTop = logScroll.scrollHeight;
        });
    }

    return {
        inOutLog,
        setInOutLog,
        setLogScroll,
        inOut,
        error,
        success
    };
}