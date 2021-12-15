import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Navigate } from 'react-router-dom';

import { Admin, Analyst, Security } from "./index";

function Main({ authorized }) {

    // if (!authorized)
    //     return <Navigate to='/'/>

    const [role, setRole] = useState('');

    Axios.defaults.withCredentials = true;

    useEffect(() => {
        Axios.get('http://localhost:3001/login').then((response) => {
            if (response.data.loggedIn == true) {
                setRole(response.data.user[0].role);
                console.log(response.data);
            }
        });
    }, []);

    return (
        <div>
            {role == 'admin' && <Admin/>}
            {role == 'security' && <Security/>}
            {role == 'analyst' && <Analyst/>}
        </div>
    );
}

export default Main;