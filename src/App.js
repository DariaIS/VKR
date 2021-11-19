import React from "react";

// import logoSvg from "./assets/img/pizza-logo.svg";

import { HeaderSecurity } from './components';
import { HomeSecurity } from './pages';
import { Route, Routes } from 'react-router-dom';


// import Footer from './components/Footer';
// import Button from './components/Button';

function App() {
  return (
    <div className="wrapper">
        <HeaderSecurity />
            <div className="content">
            <Routes>
                <Route path="/" component={HomeSecurity} exact />
            </Routes>
            </div>
          {/* <Footer /> */}
    </div>
  );
}

export default App;
