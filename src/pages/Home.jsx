import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Admin, Analyst, Security } from "./index";

export const Home = () => {

    const [role, setRole] = useState('');

    let navigate = useNavigate();

    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get('http://localhost:3001/login')
        .then((response) => {
            if (response.data.loggedIn) {
                setRole(response.data.user[0].role);
            }
            else return navigate('/');
        });
    }, [navigate]);

    return (
        <div>
            {role === 'admin' && <Admin/>}
            {role === 'security' && <Security/>}
            {role === 'analyst' && <Analyst/>}
        </div>
    );
}