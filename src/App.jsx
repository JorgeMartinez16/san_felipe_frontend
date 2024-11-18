
import React from "react";
import { Routes, Route } from 'react-router-dom';
import './App.css';
import RegisterPage from './RegisterPage';
import RegisterService from './routes/service-offered/RegisterService';
import RegisterCar from './routes/car/RegisterCar';
import Cars from './routes/car/Cars';
import Employees from './routes/Employee/Employees';
import RegisterEmployees from './routes/Employee/RegisterEmployee';
import Client from './routes/client/Client';
import RegisterClient from './routes/client/RegisterClient';
import WashedRecord from './routes/washed/WashedRecord';
import RegisterWashed from './routes/washed/RegisterWashed';
import Payment from './routes/washed/Payment';
import Service from './routes/service-offered/Service';
import NotFound from './routes/NotFound';
import LoginPage from './auth/LoginPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="routerContainer">
      <NavBar /> {/* Menú de navegación agregado */}
      <div className="otherContainer">
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register-service" element={<RegisterService />} />
        <Route path='/services' element={<Service/>}/>
        <Route path='/register-car' element={<RegisterCar />}/>
        <Route path='/cars' element={<Cars/>}/>
        <Route path='/employees' element={<Employees/>}/>
        <Route path='/register-employees' element={<RegisterEmployees/>}/>
        <Route path='/client' element={<Client/>}/>
        <Route path='/register-client' element={<RegisterClient/>}/>
        <Route path='/washed-record' element={<WashedRecord/>}/>
        <Route path='/register-wash' element={<RegisterWashed/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      </div>
      
      <Footer /> {}
    </div>
  );
};

export default App;
