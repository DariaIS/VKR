import React, { useEffect, useState } from "react";
import {ReactComponent as FileIcon} from '../assets/img/icons/file.svg';
import {ReactComponent as DirectoryIcon} from '../assets/img/icons/directory.svg';
import {ReactComponent as GoBack} from '../assets/img/icons/go-back.svg';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';

function FileManager() {
    const [parent, setParent] = useState('');
    const [filesData, setFilesData] = useState({
        path: '',
        files: []
    });

    useEffect(() => {
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
        }, 
    []);

    const clickHandler = event => {
        event.preventDefault();
        console.log(event.target.attributes.href.value)
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

    return (
    <div>
        <div>
            <a href={parent} onClick={clickHandler}>
            <GoBack height={30} width={30}/>
            Go back
            </a>
        </div>
        <div>
            directory: {filesData.path === '' ? '/' : filesData.path}
        </div>
        <ul>
            {filesData.files.map(item => {
                if (item.dir) {
                    return <li key={item.name}>
                                <a href={filesData.path + '/' + item.name} onClick={clickHandler}>
                                    <DirectoryIcon height={30} width={30}/>
                                    {item.name}
                                </a>
                            </li>
                }
                else {
                    return <li key={item.name}>
                                <FileIcon height={28} width={28}/>
                                {item.name}
                            </li>
                }
            })}
        </ul>
    </div>
    );
}

export default FileManager;