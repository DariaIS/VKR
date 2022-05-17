import React from 'react';
import { PlateModal } from '../PlateModal';

export const Modal = ({ isModalOpen, clickCloseModal, modalType, accept }) => {

    return (
        <>
            <div className={`modal__backdrop ${isModalOpen ? `modal__show` : `modal__hide`}`} tabIndex="-1"></div>
            <div className={`modal__container ${isModalOpen ? `modal__show` : `modal__hide`}`}>
                {modalType === 'plate' && <PlateModal closeModal={clickCloseModal} accept={accept}/>}
            </div>
        </>
    );
};