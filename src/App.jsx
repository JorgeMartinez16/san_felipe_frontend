import React from "react";
import MainRoutes from "./routes";
import AuthProvider from "./contexts/authContext";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
