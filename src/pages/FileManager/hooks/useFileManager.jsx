import { useState } from 'react';

export const useFileManager = () => {
    const [parent, setParent] = useState('');
    const [isModalOpen, SetIsModalOpen] = useState(false);

    const [filesData, setFilesData] = useState({
        path: '',
        files: []
    });

    const [modalData, setModalData] = useState({
        file: '',
        modalType: '',
        isOpen: false
    });

    const clickDirectory = event => {
        event.preventDefault();
        console.log(event);
        fetch('http://localhost:3001/filemanager?path=' + event.target.attributes.href.value)
        .then(res => res.json())
        .then(
            (result) => {
                let linkArr = result.path.split('/');
                linkArr.pop();
                setParent(linkArr.join('/'));
                setFilesData(result);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const effectDirectory = () => {
        fetch('http://localhost:3001/fileManager')
        .then(res => res.json())
        .then(
            (result) => {
                setFilesData(result);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const clickRemove = (event, { path }) => {
        event.preventDefault();
        console.log('http://localhost:3001/removefile?path=' + event.target.attributes.href.value);
        fetch('http://localhost:3001/removefile?path=' + event.target.attributes.href.value)
        .then(res => res.json())
        .then(
            (result) => {
                window.location.reload();
            },
            (error) => {
                console.log(error);
            }
        )
    }

    const clickOpenModal = (event, { actionData }) => {
        event.preventDefault();
        SetIsModalOpen(true);
        setModalData(actionData);
    }

    const clickCloseModal = () => {
        SetIsModalOpen(false);
    }

    const handleUpload = (event, { path }) => {
        event.preventDefault();
        console.log(event.target[0].files.length);

        if (event.target[0].files[0]) {
            const formData = new FormData();
            const name = event.target[0].files[0].name;
            formData.append('file', event.target[0].files[0], event.target[0].files[0].name);
            console.log(event.target[0].files[0])
            fetch('http://localhost:3001/uploadfile?path=' + path, {
                method: "POST",
                body: formData
            
            })
            .then(res => res.json())
            .then(
                (result) => {
                    window.location.reload();
                },
                (error) => {
                    console.log(error);
                }
            )
        }
    }

    return {
        parent,
        filesData,
        modalData,
        effectDirectory,
        clickDirectory,
        clickRemove,
        isModalOpen,
        clickOpenModal,
        clickCloseModal,
        handleUpload
    };
};
