import React, { useState } from 'react';

const RegisterService = () => {
  const [newService, setNewService] = useState({ name: '', description: '', price: '', duration: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const token = localStorage.getItem('token');

  const handleRegisterService = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/services/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newService),
      });

      if (response.ok) {
        const savedService = await response.json();
        setSuccessMessage('Servicio registrado con éxito');
        setNewService({ name: '', description: '', price: '', duration: '' });
        setError('');
      } else {
        const errorText = await response.text();
        setError(`Error al registrar el servicio: ${errorText}`);
      }
    } catch (error) {
      setError(`Error de conexión: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <h3>Registrar Nuevo Servicio</h3>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      <form onSubmit={handleRegisterService}>
        <input
          type="text"
          placeholder="Nombre"
          value={newService.name}
          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={newService.description}
          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={newService.price}
          onChange={(e) => setNewService({ ...newService, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Duración"
          value={newService.duration}
          onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
          required
        />
        <button type="submit">Registrar Servicio</button>
      </form>
    </div>
  );
};

export default RegisterService;
