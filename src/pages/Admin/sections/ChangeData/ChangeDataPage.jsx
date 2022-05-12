import React from 'react';

import { Header } from '../../../../components';
import { AdminNavigation } from '../../AdminNavigation';

import { ProtectedRoute } from '../../../../components/ProtectedRoute';
import { ChangeData } from './ChangeData';

export const AddUserPage = () => {

    return (
        <ProtectedRoute role='admin' setNewRole={null}>
            <Header>
                <AdminNavigation />
            </Header>
                <ChangeData />
        </ProtectedRoute>
    )
}