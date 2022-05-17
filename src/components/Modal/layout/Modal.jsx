import React from 'react';
import { PlateModal } from '../PlateModal';
import { ChangeModal } from '../ChangeModal';

export const Modal = ({ isModalOpen, clickCloseModal, modalData }) => {

    return (
        <>
            <div className={`modal__backdrop ${isModalOpen ? `modal__show` : `modal__hide`}`} tabIndex="-1"></div>
            <div className={`modal__container ${isModalOpen ? `modal__show` : `modal__hide`}`}>
                {modalData.modalType === 'plate' && <PlateModal closeModal={clickCloseModal} accept={modalData.accept} />}
                {modalData.modalType === 'change' && <ChangeModal closeModal={clickCloseModal} idCar={modalData.idCar}/>}
            </div>
        </>
    );
};