import React from 'react';
import { ModalRename } from '../ModalRename/ModalRename';

export const Modal = ({ modalData }) => {

    return (
        <div className={`${modalData.modalType != '' ? `show` : `hide`}`}>
            <div className={'modal__backdrop'}>
                <div className='modal__container'>
                    {modalData.modalType === 'rename' && <ModalRename modalData={modalData.file}/>}
                </div>
            </div>
        </div>
    );
};