import React from "react";

import { HeaderSecurity } from './components';
import { HomeSecurity, SignIn, Main, Admin, Analyst, Security } from './pages';
import { Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Button from './components/Button';

function App() {
  return (
    <div className="wrapper">
        <div className="content">
            <Routes>
                <Route path="/" element={<SignIn/>} exact />
                <Route path="/home" element={<Main authorized={false}/>} exact />
            </Routes>
            </div>
    </div>
  );
}

export default App;
