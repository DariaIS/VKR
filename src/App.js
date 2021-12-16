import React from "react";

import { SignIn, Role } from './pages';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="wrapper">
        <div className="content">
            <Routes>
                <Route path="/" element={<SignIn/>} exact />
                <Route path="/home" element={<Role/>} exact />
            </Routes>
            </div>
    </div>
  );
}

export default App;
