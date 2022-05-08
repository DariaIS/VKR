import { useState } from 'react';
import Axios from 'axios';

export const useAddUser = () => { 
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInput = (e) => {
        setError('');
        setSuccess('');

        switch (e.target.name) {
            case 'userName':
                setUserName(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'role':
                setRole(e.target.value);
                break;
            default:
                break;
        }
    };

    const addUser = (e) => {
        Axios.post('http://localhost:3001/addUser', {
            userName: userName,
            password: password,
            role: role

        }).then((response) => {
            if (response.data.message)
                if (response.data.message === 'Пользователь успешно добавлен!') {
                    setSuccess(response.data.message);
                    setError('');
                }
                else {
                    setError(response.data.message);
                    setSuccess('');
                }
        });
        e.preventDefault();
    };

    return {
        handleInput,
        addUser,
        error,
        success
    };
}