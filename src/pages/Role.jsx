import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

import { Admin, Analyst, Security } from "./index";
import { Header, Footer } from '../components/index';

function Role() {

    const [role, setRole] = useState('');

    let navigate = useNavigate();

    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get('http://localhost:3001/login').then((response) => {
            if (response.data.loggedIn === true) {
                setRole(response.data.user[0].role);
                console.log(response.data);
            }
            else return navigate('/');
        });
    }, [navigate]);

    return (
        <div>
            <Header/>
            {role === 'admin' && <Admin/>}
            {role === 'security' && <Security/>}
            {role === 'analyst' && <Analyst/>}
            <Footer/>
        </div>
    );
}

export default Role;