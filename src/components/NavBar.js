import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'
const NavBar = ({ isUserOnline, onLogout }) => {
  return (
    <nav className="navbar">
      <Link to="/login">Login</Link>
      <Link to="/register-service">Register Service</Link>
      <Link to="/register-car">Register Car</Link>
      <Link to="/cars">Cars</Link>
      <Link to="/services">Services</Link>
      <Link to="/employees">Employees</Link>
      <Link to="/register-employees">Register Employees</Link>
      <Link to="/client">Client</Link>
      <Link to="/register-client">Register Client</Link>
      <Link to="/washed-record">Washed Record</Link>
      <Link to="/register-wash">Register Wash</Link>
      <Link to="/payment">Payment</Link>
      <div className="user-status">
        {isUserOnline ? (
          <span className="online-indicator">En línea</span>
        ) : (
          <span className="offline-indicator">Desconectado</span>
        )}
        <button className="logout-button" onClick={onLogout}>
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default NavBar;