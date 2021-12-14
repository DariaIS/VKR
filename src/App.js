import React from "react";

import { HeaderSecurity } from './components';
import { HomeSecurity, SignIn, Main } from './pages';
import { Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Button from './components/Button';

function App() {
  return (
    <div className="wrapper">
        {/* <HeaderSecurity /> */}
        <div className="content">
            <Routes>
                <Route path="/" element={<SignIn/>} exact />
                <Route path="/main" element={<Main/>} exact />
            </Routes>
            </div>
          {/* <Footer /> */}
    </div>
  );
}

export default App;
