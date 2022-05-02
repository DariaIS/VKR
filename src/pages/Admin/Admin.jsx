import React from 'react';

import { Header } from '../../components';
import { AdminNavigation } from './AdminNavigation';

export const Admin = () => {

    return (
        <>
            <Header>
                <AdminNavigation />
            </Header>
            <div className="admin section container">
                <span className="admin__title title title--large">Вы вошли как администратор</span>
            </div>
        </>
    );
}