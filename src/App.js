import React from "react";
import { Route, Routes } from 'react-router-dom';

import { SignIn, Home } from './pages';
import { AddCar, AddUser, ChangeData } from './pages/Admin/sections';
import { ByDate, AllCars, ByPlate } from './pages/Analyst/sections';

export const App = () => {
  return (
    <div className="wrapper">
        <div className="content">
            <Routes>
                <Route path="/" element={<SignIn/>} exact />
                <Route path="/home" element={<Home/>} exact />

                <Route path="/addCar" element={<AddCar/>} exact />
                <Route path="/addUser" element={<AddUser/>} exact />
                <Route path="/changeData" element={<ChangeData/>} exact />

                <Route path="/byDate" element={<ByDate/>} exact />
                <Route path="/allCars" element={<AllCars/>} exact />
                <Route path="/byPlate" element={<ByPlate/>} exact />
            </Routes>
            </div>
    </div>
  );
}