import { useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const ProtectedRoute = ({ children, role, setNewRole }) => {

    // const [isLogin, setIsLogin] = useState(false);
    let navigate = useNavigate();

    Axios.defaults.withCredentials = true;
    useEffect(() => {
        console.log('route')
        Axios.get('http://localhost:3001/login')
            .then((response) => {
                console.log(response.data)
                if (response.data.loggedIn) {
                    if (role === null) {
                        setNewRole(response.data.user[0].role);
                    }
                    else if (response.data.user[0].role !== role)
                        return navigate('/');
                }
                else return navigate('/');
            })
            .catch((err) => {
                return navigate('/');
            });
    }, [role, setNewRole, navigate]);

    return children;
};