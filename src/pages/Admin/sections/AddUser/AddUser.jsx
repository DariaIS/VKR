import React from 'react';

import { Header } from '../../../../components';
import { AdminNavigation } from '../../AdminNavigation';

import { ProtectedRoute } from '../../../../components/ProtectedRoute';
import { AddUserContent } from './AddUserContent';

export const AddUser = () => {

    return (
        <ProtectedRoute role='admin' setNewRole={null}>
            <Header>
                <AdminNavigation />
            </Header>
                <AddUserContent />
        </ProtectedRoute>
    )
}