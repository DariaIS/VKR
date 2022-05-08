import { useState, useCallback } from 'react';
import Axios from 'axios';

export const usePlateModal = () => {
    const [plates, setPlates] = useState('');


    const getPlates = useCallback(() => {
        console.log('getPlates')
        Axios.get('http://localhost:3001/carsPlates').then((response) => {
            console.log(response.data.result);
            setPlates(response.data.result);
        });
    }, []);

    return {
        plates,
        getPlates
    };
}