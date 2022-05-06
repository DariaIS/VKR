import { useState } from 'react';
import Axios from 'axios';

export const useSecurity = () => { 
    
    const [inOutLog, setInOutLog] = useState('');
    const [logScroll, setLogScroll] = useState('');
    
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    
    const scroll = () => { 
        let logBlock = document.getElementsByClassName('security__log')[0];
        logBlock.scrollTop = logBlock.scrollHeight;
        setLogScroll(logBlock);
    }

    const inOut = (e) => {
        setError('');
        setSuccess('');
        Axios.post('http://localhost:3001/inOutCar', {
            direction: e.target.id
        }).then((response) => {
            setInOutLog(response.data.log)
            if (response.data.message)
                if (response.data.message === 'Машина может быть пропущена!') {
                    setSuccess(response.data.message);
                    setError('');
                }
                else {
                    setError(response.data.message);
                    setSuccess('');
                }
            logScroll.scrollTop = logScroll.scrollHeight;
        });
    }

    return {
        inOutLog,
        setInOutLog,
        scroll,
        inOut,
        error,
        success
    };
}