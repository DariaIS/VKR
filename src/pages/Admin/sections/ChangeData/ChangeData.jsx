import React from 'react';

import { Header } from '../../../../components';
import { AdminNavigation } from '../../AdminNavigation';

import { ProtectedRoute } from '../../../../components/ProtectedRoute';
import { ChangeDataContent } from './ChangeDataContent';

export const ChangeData = () => {

    return (
        <ProtectedRoute role='admin' setNewRole={null}>
            <Header>
                <AdminNavigation />
            </Header>
                <ChangeDataContent />
        </ProtectedRoute>
    )
}