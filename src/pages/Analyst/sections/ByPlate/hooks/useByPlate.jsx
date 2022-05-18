import { useState, useCallback } from 'react';
import Axios from 'axios';

export const useByPlate = () => {

    const [inOutData, setInOutData] = useState('');
    const [plateList, setPlateList] = useState(new Date());

    const [plate, setPlate] = useState('');

    const getPlateList = useCallback(() => {
        Axios.get('http://localhost:3001/allCarPlates').then((response) => {
            if (response.data.result)
                setPlateList(response.data.result);
        });
    }, []);

    const getinOutData = (plate) => {
        setPlate(plate)
        Axios.get(`http://localhost:3001/byPlate?plate=${plate.value}`).then((response) => {
            console.log(response.data.result);
            setInOutData(response.data.result);
        });
    };


    return {
        getPlateList,
        plateList,
        getinOutData,
        inOutData,
        plate
    };
}