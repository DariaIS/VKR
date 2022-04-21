import { useState } from 'react';

export const useFileManager = () => {
    const [parent, setParent] = useState('');
    const [filesData, setFilesData] = useState({
        path: '',
        files: []
    });

    // const [modalData, setModalData] = useState({
    //     file: '',
    //     modalType: ''
    // });

    const clickDirectory = event => {
        event.preventDefault();
        console.log(event.target.attributes.href.value);
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
    )}

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

    // const clickRemove = (event) => {
    //     event.preventDefault();
    //     console.log('http://localhost:3001/removefile?path=' + event.target.attributes.href.value);
    //     fetch('http://localhost:3001/removefile?path=' + event.target.attributes.href.value)
    //     .then(res => res.json())
    //     .then(
    //         (result) => {
    //             console.log(result);
    //             window.location.reload();
    //         },
    //         (error) => {
    //             console.log(error);
    //         }
    //     )
    // }

    // const openModal = ({ actionData }) => {
    //     setModalData(actionData);
    // }

    return {
        parent,
        filesData,
        // modalData,
        effectDirectory,
        clickDirectory,
        // clickRemove,
        // openModal
    };
};
