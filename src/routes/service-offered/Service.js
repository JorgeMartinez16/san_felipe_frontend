import React, { useState, useEffect } from 'react';

const Services = () => {
  const [services, setServices] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const token = localStorage.getItem('token');

  // Lista de servicios
  const fetchServices = async () => {
    try {
      const response = await fetch('http://localhost:8080/services', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Error al obtener la lista de servicios');
      const data = await response.json();
      setServices(data);
      setIsSearching(false);
      setError('');
      setSuccessMessage('');
    } catch (err) {
      setError(err.message);
    }
  };

  // Buscar servicio por nombre
  const handleSearchService = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/services?name=${searchName}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const service = await response.json();
        setServices([service]);
        setSuccessMessage('Servicio encontrado con éxito');
        setIsSearching(true);
        setError('');
      } else {
        setServices([]);
        setError('No se encontró ningún servicio con ese nombre');
        setSuccessMessage('');
      }
    } catch (error) {
      setError(`Error de conexión: ${error.message}`);
    }
  };

  // Maneja el clic del botón "Listar Todos"
  const handleListServices = () => {
    setSearchName('');
    fetchServices();
  };

  return (
    <div className="container">
      <h2>Lista de Servicios</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      <div>
        <button onClick={handleListServices}>Listar Todos</button>
        <form onSubmit={handleSearchService} style={{ display: 'inline-block', marginLeft: '10px' }}>
          <input
            type="text"
            placeholder="Buscar por Nombre"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            required
          />
          <button type="submit">Buscar</button>
        </form>
      </div>

      <table className="services-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Duración</th>
          </tr>
        </thead>
        <tbody>
          {services.length > 0 ? (
            services.map((service) => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>{service.description}</td>
                <td>{service.price}</td>
                <td>{service.duration}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                {isSearching ? 'No se encontró ningún servicio con ese nombre' : 'SERVICIOS LISTADOS'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Services;
