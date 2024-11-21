import React, { useContext } from "react";
import NavBar from "../components/NavBar";
import { Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import RegisterPage from "../RegisterPage";
import RegisterService from "./service-offered/RegisterService";
import RegisterCar from "./car/RegisterCar";
import Cars from "./car/Cars";
import Employees from "./Employee/Employees";
import Services from "./service-offered/Service";
import RegisterEmployee from "./Employee/RegisterEmployee";
import Clients from "./client/Client";
import RegisterClient from "./client/RegisterClient";
import WashedRecord from "./washed/WashedRecord";
import RegisterWashed from "./washed/RegisterWashed";
import Payment from "./washed/Payment";
import NotFound from "./NotFound";

import "./App.css";
import { AuthContext } from "../contexts/authContext";
import Dashboard from "./dashboard";

export default function MainRoutes() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  return (
    <div className="routerContainer">
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <div className="otherContainer">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register-service" element={<RegisterService />} />
          <Route path="/services" element={<Services />} />
          <Route path="/register-car" element={<RegisterCar />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/register-employees" element={<RegisterEmployee />} />
          <Route path="/client" element={<Clients />} />
          <Route path="/register-client" element={<RegisterClient />} />
          <Route path="/washed-record" element={<WashedRecord />} />
          <Route path="/register-wash" element={<RegisterWashed />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer /> {}
    </div>
  );
}
