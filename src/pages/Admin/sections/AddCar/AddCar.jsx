import React from 'react';

import { Header } from '../../../../components';
import { AdminNavigation } from '../../AdminNavigation';

import { ProtectedRoute } from '../../../../components/ProtectedRoute';
import { AddCarContent } from './AddCarContent';

export const AddCar = () => {

    return (
        <ProtectedRoute role='admin' setNewRole={null}>
            <Header>
                <AdminNavigation />
            </Header>
                <AddCarContent />
        </ProtectedRoute>
    )
}