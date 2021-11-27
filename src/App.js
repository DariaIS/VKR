import React from "react";

// import logoSvg from "./assets/img/pizza-logo.svg";

import { HeaderSecurity } from './components';
import { HomeSecurity, SignIn } from './pages';
import { Route, Routes } from 'react-router-dom';


import Footer from './components/Footer';
import Button from './components/Button';

const mysql = require('mysql');

const conn = mysql.createConnection({
  host: "127.0.0.1", 
  port: '3306',
  user: 'root',
  database: "vkr",
});

conn.connect(function (err) {
  if (err) {
      return console.error("Ошибка: " + err.message);
  }
  else {
      console.log("Подключение к серверу MySQL успешно установлено");
  }
});


function App() {
  return (
    <div className="wrapper">
        {/* <HeaderSecurity /> */}
        <div className="content">
            <Routes>
                <Route path="/" element={<SignIn/>} exact />
                <Route path="/homeSecurity" element={<HomeSecurity/>} exact />
            </Routes>
            </div>
          {/* <Footer /> */}
    </div>
  );
}

export default App;
