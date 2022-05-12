import React from "react";
import { Route, Routes } from 'react-router-dom';

import { SignIn, Home } from './pages';
import { AddCarPage, AddUserPage } from './pages/Admin/sections';
import { ByDatePage, AllCarsPage } from './pages/Analyst/sections';

export const App = () => {
  return (
    <div className="wrapper">
        <div className="content">
            <Routes>
                <Route path="/" element={<SignIn/>} exact />
                <Route path="/home" element={<Home/>} exact />

                <Route path="/addCar" element={<AddCarPage/>} exact />
                <Route path="/addUser" element={<AddUserPage/>} exact />

                <Route path="/byDate" element={<ByDatePage/>} exact />
                <Route path="/allCars" element={<AllCarsPage/>} exact />
            </Routes>
            </div>
    </div>
  );
}