import React, { useState } from 'react';
import { ModalRename } from '../ModalRename/ModalRename';

export const Modal = ({ isModalOpen, clickCloseModal, modalData }) => {
        console.log(modalData)

        return (
            <>
                <div className={`modal__backdrop ${isModalOpen ? `show` : `hide`}`} tabIndex="-1" onClick={clickCloseModal}></div>
                    <div className={`modal__container ${isModalOpen ? `show` : `hide`}`}>
                        {modalData.modalType === 'rename' && <ModalRename closeModal={clickCloseModal} directory={modalData.directory} file={modalData.file}/>}
                    </div>
            </>
        );
};