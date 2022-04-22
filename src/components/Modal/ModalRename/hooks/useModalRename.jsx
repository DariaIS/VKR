import { useState } from 'react';

export const useModalRename = () => {
    const [newName, setNewName] = useState('');
    const [error, setError] = useState('');

    const handleChangeName = ({
        target: { value },
    }) => {
            setNewName(value);
        }
    
    const clickRename = (file) => {

        if (!newName.trim()) {
            setError('Please write new name');
        }
        else {
            console.log('http://localhost:3001/renamefile?path=' + file);
            fetch('http://localhost:3001/renamefile?path=' + file, {
                headers:  {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                },
                method: "POST",
                body: JSON.stringify({newName})
            
            })
            .then(res => res.json())
            .then(
                (result) => {
                    window.location.reload();
                },
                (error) => {
                    setError(error);
                }
            )
        }
    }

    return {
        newName,
        handleChangeName,
        clickRename,
        error
    };
};
