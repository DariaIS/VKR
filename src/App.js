import React from "react";
import { Route, Routes } from 'react-router-dom';

import { SignIn, Home } from './pages';
import { AddCar, AddUser } from './pages/Admin';
import { ByDate, AllCars } from './pages/Analyst';

export const App = () => {
  return (
    <div className="wrapper">
        <div className="content">
            <Routes>
                <Route path="/" element={<SignIn/>} exact />
                <Route path="/home" element={<Home/>} exact />

                <Route path="/addCar" element={<AddCar/>} exact />
                <Route path="/addUser" element={<AddUser/>} exact />

                <Route path="/byDate" element={<ByDate/>} exact />
                <Route path="/allCars" element={<AllCars/>} exact />
            </Routes>
            </div>
    </div>
  );
}