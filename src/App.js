import React from "react";
// import { Route } from 'react-router-dom';
// import logoSvg from "./assets/img/pizza-logo.svg";

import HeaderSecurity from './components/HeaderSecurity';

function App() {
  return (
    <div className="wrapper">
        <HeaderSecurity />
          <div className="content">
            {/* <Route path="/" component={Home} exact />
            <Route path="/cart" component={Cart} exact /> */}
          </div>
    </div>
  );
}

export default App;
