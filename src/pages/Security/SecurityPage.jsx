import React from 'react';

import { Header } from '../../../../components';

import { ProtectedRoute } from '../../../../components/ProtectedRoute';
import { Security } from './Security';

export const ByDatePage = () => {

    return (
        <ProtectedRoute role='security' setNewRole={null}>
            <Header />
            <Security />
        </ProtectedRoute>
    )
}