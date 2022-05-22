import React from 'react';

import { Header } from '../../../../components';
import { AdminNavigation } from '../../AdminNavigation';

import { ProtectedRoute } from '../../../../components/ProtectedRoute';
import { DeleteUser } from './DeleteUser';
import { AddUser } from './AddUser';

export const User = () => {

    return (
        <ProtectedRoute role='admin' setNewRole={null}>
            <Header>
                <AdminNavigation />
            </Header>
            <div className="user container section">
                <AddUser />
                <DeleteUser />
            </div>
        </ProtectedRoute>
    )
}