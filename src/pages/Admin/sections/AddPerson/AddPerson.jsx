import React from 'react';

import { Header } from '../../../../components';
import { AdminNavigation } from '../../AdminNavigation';

import { ProtectedRoute } from '../../../../components/ProtectedRoute';
import { AddPersonContent } from './AddPersonContent';

export const AddPerson = () => {

    return (
        <ProtectedRoute role='admin' setNewRole={null}>
            <Header>
                <AdminNavigation />
            </Header>
                <AddPersonContent />
        </ProtectedRoute>
    )
}