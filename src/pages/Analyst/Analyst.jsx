import React from 'react';

import { Header } from '../../components';
import { AnalystNavigation } from './AnalystNavigation/AnalystNavigation';

export const Analyst = () => {

    return (
        <>
            <Header>
                <AnalystNavigation />
            </Header>
            <div className="analyst section container">
                <span className="analyst__title title title--large">Вы вошли как аналитик</span>
            </div>
        </>
    );
}