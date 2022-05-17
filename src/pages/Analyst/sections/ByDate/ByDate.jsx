import React from 'react';

import { Header } from '../../../../components';
import { AnalystNavigation } from '../../AnalystNavigation';

import { ProtectedRoute } from '../../../../components/ProtectedRoute';
import { ByDateContent } from './ByDateContent';

export const ByDate = () => {

    return (
        <ProtectedRoute role='analyst' setNewRole={null}>
            <Header>
                <AnalystNavigation />
            </Header>
                <ByDateContent />
        </ProtectedRoute>
    )
}