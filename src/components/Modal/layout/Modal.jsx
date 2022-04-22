import React, { useState } from 'react';
import { ModalRename } from '../ModalRename/ModalRename';

export const Modal = ({ isModalOpen, clickCloseModal, modalData }) => {

    if (isModalOpen) {
        return (
            <div className={`show`}>
                <div className={'modal__backdrop'} onClick={clickCloseModal}>
                    <div className='modal__container'>
                        {modalData.modalType === 'rename' && <ModalRename modalData={modalData.file}/>}
                    </div>
                </div>
            </div>
        );
    }
};