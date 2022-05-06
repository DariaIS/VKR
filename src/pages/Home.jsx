import React, { useState } from 'react';

import { Admin, Analyst, Security } from "./index";

import { ProtectedRoute } from '../components/ProtectedRoute';

export const Home = () => {

    const [role, setRole] = useState('');

    return (
        <ProtectedRoute role={null} setNewRole={setRole}>
            <div>
                {role === 'admin' && <Admin />}
                {role === 'security' && <Security />}
                {role === 'analyst' && <Analyst />}
            </div>
        </ProtectedRoute>
    );
}