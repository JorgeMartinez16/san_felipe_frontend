import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
const NavBar = ({ currentUser, setCurrentUser }) => {
  return (
    <nav className="navbar">
      <Link to="/">Home Page</Link>
      <Link to="/register-service">Registrar Servicio</Link>
      <Link to="/register-car">Registrar Auto</Link>
      <Link to="/cars">Autos</Link>
      <Link to="/services">Servicios</Link>
      <Link to="/employees">Empleados</Link>
      <Link to="/register-employees">Registrar Empleados</Link>
      <Link to="/client">Client</Link>
      <Link to="/register-client">Registrar Clientes</Link>
   {/*    <Link to="/washed-record">Washed Record</Link> */}
      <Link to="/register-wash">Registrar Lavado</Link>
      <Link to="/payment">Pagos Lavadores</Link>
      <div className="user-status">
        {currentUser.toUpperCase()}
        <button className="logout-button" onClick={() => setCurrentUser()}>
          Cerrar sesión
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
