import React, { useEffect } from "react";

import {ReactComponent as FileIcon} from './icons/file.svg';
import {ReactComponent as DirectoryIcon} from './icons/directory.svg';
import {ReactComponent as GoBack} from './icons/go-back.svg';
import {ReactComponent as RenameIcon} from './icons/rename.svg';
import {ReactComponent as RemoveIcon} from './icons/remove.svg';

import { useFileManager } from './hooks/useFileManager';
import { Modal } from "../../components/Modal";

export const FileManager = () => {
    const { parent, filesData, modalData, effectDirectory, clickDirectory, clickRemove, openModal } = useFileManager();

    useEffect(() => {effectDirectory()}, []);

    return (
    <div className="analyst section container analyst__table">
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
                                </td>
                                <td className="analyst__td">{(item.size / 1024).toFixed(2) + ' KB'}</td>
                            </>
                        }
                        <td className="analyst__td">{item.birthTime.replace('T',' ').replace('Z',' ')}</td>
                        <td className="analyst__td">
                            {/* <a href={filesData.path + '/' + item.name} onClick={clickRemove}>
                                <RemoveIcon height={28} width={28} pointerEvents='none'/>
                            </a>

                            <a href={filesData.path + '/' + item.name} onClick={openModal({modalData: {file: filesData.path + '/' + item.name, modalType: 'rename'}})}>
                                <RenameIcon height={28} width={28} pointerEvents='none'/>
                            </a> */}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {/* <Modal modalData={modalData}/> */}
    </div>
    );
}