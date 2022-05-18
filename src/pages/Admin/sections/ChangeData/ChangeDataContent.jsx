import React, { useEffect } from 'react';

import Select from 'react-select';

import { Modal } from '../../../../components/Modal';

import { useChangeData } from './hooks/useChangeData';

export const ChangeDataContent = () => {

    const {
        plateList,
        plate,
        isModalOpen,
        handleSelectChange,
        clickCloseModal,
        getPlates,
        handleAcceptClick,
        error
    } = useChangeData();

    useEffect(() => {
        getPlates();
    }, [getPlates]);

    return (
        <>
            <div className="changeData container">
                <div className="changeData__forms section">
                    <span className="changeData__title admin__title--section title title--medium">
                        Просмотр и изменение сведений об автомобиле
                    </span>
                    <div className='changeData__elems'>
                        <Select className="changeData__select select"
                            onChange={(e) => handleSelectChange(e)}
                            options={plateList}
                        />
                        <button type='button' className="changeData__button button button--blue" onClick={handleAcceptClick}>Изменить</button>
                        {error !== '' && <span className="status status--warning status--center">{error}</span>}
                    </div>
                </div>
            </div>
            {isModalOpen && <Modal isModalOpen={isModalOpen} clickCloseModal={clickCloseModal} modalData={{modalType: 'change', plate: plate}}/>}
        </>
    )
}