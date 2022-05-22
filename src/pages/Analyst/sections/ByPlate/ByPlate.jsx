import React from 'react';

import { Header } from '../../../../components';
import { AnalystNavigation } from '../../AnalystNavigation';

import { ProtectedRoute } from '../../../../components/ProtectedRoute';
import { ByPlateContent } from './ByPlateContent';

export const ByPlate = () => {

    return (
        <ProtectedRoute role='analyst' setNewRole={null}>
            <Header>
                <AnalystNavigation />
            </Header>
                <ByPlateContent />
        </ProtectedRoute>
    )
}