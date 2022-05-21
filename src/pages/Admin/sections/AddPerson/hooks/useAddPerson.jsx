import { useState } from 'react';
import Axios from 'axios';

export const useAddPerson = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInput = (e) => {
        setError('');
        setSuccess('');

        switch (e.target.name) {
            case 'name':
                setUserName(e.target.value.trim());
                break;
            case 'lastName':
                setPassword(e.target.value);
                break;
            case 'middleName':
                setRole(e.target.value);
                break;
            case 'chair':
                setRole(e.target.value);
                break;
            default:
                break;
        }
    };

    const handleAcceptClick = (e) => {
        setError('');
        if (userName !== '' && password !== '' && role !== '') {
            Axios.post('http://localhost:3001/addUser', {
                userName: userName,
                password: password,
                role: role
            }).then((response) => {
                if (response.data.message) {
                    setSuccess(response.data.message);
                    setError('');
                }
                else {
                    setError(response.data.err);
                    setSuccess('');
                }
            });
        } else setError('Не все поля заполнены!');
    };

    return {
        handleInput,
        handleAcceptClick,
        error,
        success
    };
}