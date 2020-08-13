import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

import GlobalStyle from "./Global";

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <GlobalStyle />
  </>
);

export default App;
