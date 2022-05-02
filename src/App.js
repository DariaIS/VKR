import React from "react";

import { SignIn, Home } from './pages';
import { Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <div className="wrapper">
        <div className="content">
            <Routes>
                <Route path="/" element={<SignIn/>} exact />
                <Route path="/home" element={<Home/>} exact />
            </Routes>
            </div>
    </div>
  );
}