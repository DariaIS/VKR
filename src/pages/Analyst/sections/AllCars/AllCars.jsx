import React from 'react';

import { Header } from '../../../../components';
import { AnalystNavigation } from '../../AnalystNavigation';

import { ProtectedRoute } from '../../../../components/ProtectedRoute';
import { AllCarsContent } from './AllCarsContent';

export const AllCars = () => {

    return (
        <ProtectedRoute role='analyst' setNewRole={null}>
            <Header>
                <AnalystNavigation />
            </Header>
                <AllCarsContent />
        </ProtectedRoute>
    )
}