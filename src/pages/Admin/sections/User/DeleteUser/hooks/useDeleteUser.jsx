import { useState } from 'react';
import Axios from 'axios';

export const useDeleteUser = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleInput = (e) => {
        setError('');
        setSuccess('');

        switch (e.target.name) {
            case 'userName':
                setUserName(e.target.value.trim());
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            default:
                break;
        }
    };

    const handleAcceptClick = (e) => {
        setError('');
        if (userName !== '' && password !== '') {
            Axios.post('http://localhost:3001/deleteUser', {
                userName: userName,
                password: password
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
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword,
        error,
        success
    };
}