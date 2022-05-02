import React, { useState, useEffect } from "react";

import {ReactComponent as FileIcon} from './icons/file.svg';
import {ReactComponent as DirectoryIcon} from './icons/directory.svg';
import {ReactComponent as GoBack} from './icons/go-back.svg';
import {ReactComponent as RenameIcon} from './icons/rename.svg';
import {ReactComponent as RemoveIcon} from './icons/remove.svg';

import { useFileManager } from './hooks/useFileManager';
import { Modal } from "../../components/Modal";

export const FileManager = () => {
    const { 
        parent, 
        filesData, 
        modalData, 
        effectDirectory,
        getDirectory,
        clickDirectory, 
        getImage, 
        clickRemove, 
        isModalOpen, 
        clickOpenModal, 
        clickCloseModal, 
        handleUpload,
        findTextNode,
        clearTextNode
    } = useFileManager();

    const [nodeText, setNodeText] = useState('');

    const ext = ['jpeg', 'png', 'jpg']
    
    useEffect(() => {effectDirectory()}, []);

    return (
    <div className="fileManager section container table">
        <div className="fileManager__textNode">
            <input 
                className="input input--small input--default" 
                type="text" 
                name="textNode"
                onChange={(e) => {
                    setNodeText(e.target.value);
                }}
            /> 
            <button className="button button--blue" onClick={() => findTextNode(document.body, nodeText.trim())}>Найти</button>
            <button className="button button--white" onClick={() => clearTextNode(document.body)}>Отчистить</button>

        </div>
        <span className="table__title title title--small">
            <a href={parent} onClick={clickDirectory}>
                <GoBack height={30} width={30} pointerEvents='none'/>
                Назад
            </a>
        </span>
        <span className="table__title title title--small">
            Папка: {filesData.path === '' ? '/' : filesData.path}
        </span>
        <table className="table__item">
            <thead className="table__thead">
                <tr className="table__tr">
                    <th className="table__th">
                        Название
                    </th>
                    <th className="table__th">
                        Размер
                    </th>
                    <th className="table__th">
                        Дата создания
                    </th>
                    <th className="table__th">
                        Действия
                    </th>
                </tr>
            </thead>
            <tbody className="table__tbody">
                {filesData.files.map(item => (
                    <tr className="table__tr" key={item.name}>
                        {item.dir && 
                            <>
                                <td className="table__td">
                                    <a href={filesData.path + '/' + item.name} onClick={clickDirectory}>
                                        <DirectoryIcon height={30} width={30} pointerEvents='none'/>
                                        <span className="fileManager__dir-name">
                                            {item.name}
                                        </span>
                                    </a>
                                </td>
                                <td className="table__td"></td>
                            </>
                        }
                        {!item.dir && 
                            <>
                                <td className="table__td">
                                    <FileIcon height={28} width={28}/>
                                    <span>
                                        {item.name}
                                    </span>
                                    {ext.includes(item.name.split('.')[1]) && getImage(filesData.path + '/' + item.name, item.name)}
                                </td>
                                <td className="table__td">{(item.size / 1024).toFixed(2) + ' KB'}</td>
                            </>
                        }
                        <td className="table__td">{item.birthTime.replace('T',' ').replace('Z',' ')}</td>
                        <td className="table__td">
                            <a href={filesData.path + '/' + item.name} onClick={(event) => clickRemove(event, {path: filesData.path})}>
                                <RemoveIcon height={28} width={28} pointerEvents='none'/>
                            </a>

                            <a href={filesData.path + '/' + item.name} onClick={
                                (event) => {
                                    clickOpenModal(event, {
                                        actionData: {
                                            file: event.target.attributes.href.value, 
                                            modalType: 'rename',
                                            directory: () => getDirectory(filesData.path)
                                        }
                                    });
                                }}>
                                <RenameIcon height={28} width={28} pointerEvents='none'/>
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {isModalOpen && <Modal isModalOpen={isModalOpen} clickCloseModal={clickCloseModal} modalData={modalData}/>}
            <form onSubmit={(event) => handleUpload(event, {path: filesData.path})}> 
                <input type="file" name="fileUpload"/>
                <button type='submit' className="button button--blue signin__button">Upload</button>
            </form>
    </div>
    );
}