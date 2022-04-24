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
    <div className="analyst section container analyst__table">
        <div>
            <input 
                className="input input--small input--default" 
                type="text" 
                name="textNode"
                onChange={(e) => {
                    setNodeText(e.target.value);
                }}
            /> 
            <button className="button button--blue" onClick={() => findTextNode(document.body, nodeText)}>Find</button>
            <button className="button button--white" onClick={() => clearTextNode(document.body)}>Clear</button>

        </div>
        <span className="analyst__table-title title title--small">
            <a href={parent} onClick={clickDirectory}>
                <GoBack height={30} width={30} pointerEvents='none'/>
                Go back
            </a>
        </span>
        <span className="analyst__table-title title title--small">
            directory: {filesData.path === '' ? '/' : filesData.path}
        </span>
        <table className="analyst__table-item">
            <thead className="analyst__thead">
                <tr className="analyst__tr">
                    <th className="analyst__th">
                        Name
                    </th>
                    <th className="analyst__th">
                        Size
                    </th>
                    <th className="analyst__th">
                        Date created
                    </th>
                    <th className="analyst__th">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody className="analyst__tbody">
                {filesData.files.map(item => (
                    <tr className="analyst__tr" key={item.name}>
                        {item.dir && 
                            <>
                                <td className="analyst__td">
                                    <a href={filesData.path + '/' + item.name} onClick={clickDirectory}>
                                        <DirectoryIcon height={30} width={30} pointerEvents='none'/>
                                        {item.name}
                                    </a>
                                </td>
                                <td className="analyst__td"></td>
                            </>
                        }
                        {!item.dir && 
                            <>
                                <td className="analyst__td">
                                    <FileIcon height={28} width={28}/>
                                    {item.name}
                                    {ext.includes(item.name.split('.')[1]) && getImage(filesData.path + '/' + item.name, item.name)}
                                </td>
                                <td className="analyst__td">{(item.size / 1024).toFixed(2) + ' KB'}</td>
                            </>
                        }
                        <td className="analyst__td">{item.birthTime.replace('T',' ').replace('Z',' ')}</td>
                        <td className="analyst__td">
                            <a href={filesData.path + '/' + item.name} onClick={clickRemove}>
                                <RemoveIcon height={28} width={28} pointerEvents='none'/>
                            </a>

                            <a href={filesData.path + '/' + item.name} onClick={
                                (event) => {
                                    clickOpenModal(event, {
                                        actionData: {
                                            file: event.target.attributes.href.value, 
                                            modalType: 'rename', 
                                        }
                                    })
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