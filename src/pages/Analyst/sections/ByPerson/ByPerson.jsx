import React from 'react';

import { Header } from '../../../../components';
import { AnalystNavigation } from '../../AnalystNavigation';

import { ProtectedRoute } from '../../../../components/ProtectedRoute';
import { ByPersonContent } from './ByPersonContent';

export const ByPerson = () => {

    return (
        <ProtectedRoute role='analyst' setNewRole={null}>
            <Header>
                <AnalystNavigation />
            </Header>
                <ByPersonContent />
        </ProtectedRoute>
    )
}