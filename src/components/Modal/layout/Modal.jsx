import React from 'react';
import { PlateModal } from '../PlateModal';
import { ChangeModal } from '../ChangeModal';

export const Modal = ({ isModalOpen, clickCloseModal, modalData }) => {
    return (
        <>
            {/* от значения булевой переменной isModalOpen (то есть открыто окно или нет)
            зависит то, какой стиль применится к элементу */}
            <div className={`modal__backdrop ${isModalOpen ? `modal__show` : `modal__hide`}`} tabIndex="-1"></div>
            <div className={`modal__container ${isModalOpen ? `modal__show` : `modal__hide`}`}>
                {/* компонент возвращает определенное модальное окно в зависимости от значения одного из параметров*/}
                {modalData.modalType === 'plate' && <PlateModal closeModal={clickCloseModal} accept={modalData.accept} direction={modalData.direction} />}
                {modalData.modalType === 'change' && <ChangeModal closeModal={clickCloseModal} plate={modalData.plate} />}
            </div>
        </>
    );
};