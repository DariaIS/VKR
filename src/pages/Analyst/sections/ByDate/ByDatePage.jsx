import React from 'react';

import { Header } from '../../../../components';
import { AnalystNavigation } from '../../AnalystNavigation';

import { ProtectedRoute } from '../../../../components/ProtectedRoute';
import { ByDate } from './ByDate';

export const ByDatePage = () => {

    return (
        <ProtectedRoute role='analyst' setNewRole={null}>
            <Header>
                <AnalystNavigation />
            </Header>
                <ByDate />
        </ProtectedRoute>
    )
}