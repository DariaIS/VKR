import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

export const useSignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    Axios.defaults.withCredentials = true;
    const login = () => {
        if (!username || !password)
            setError('Не все поля заполнены!');
        else {
            console.log(username.length)
            Axios.post('http://localhost:3001/login', {
                username: username,
                password: password
            }).then((response) => {
                if (response.data.err)
                    setError(response.data.err);
                else navigate('/home');
            });
        }
    };

    const handleInput = (e) => {
        setError('');
        
        switch (e.target.name) {
            case 'name':
                setUsername(e.target.value.trim());
                break;
            case 'password':
                setPassword(e.target.value.trim());
                break;
            default:
                break;
        };
    }

    return {
        login,
        handleInput,
        navigate,
        error
    };
}