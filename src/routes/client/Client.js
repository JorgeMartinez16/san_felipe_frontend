import React, { useState, useEffect } from 'react';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({ name: '', lastName: '', nit: '', phoneNumber: '' });
  const [searchName, setSearchName] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Recupera el token del localStorage
  const token = localStorage.getItem('token');

  // Función para obtener la lista de clientes
  const fetchClients = async () => {
    try {
      const response = await fetch('http://localhost:8080/clients', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Error al obtener la lista de clientes');
      const data = await response.json();
      setClients(data);
      setIsSearching(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Registrar un cliente
  const handleRegisterClient = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/clients/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newClient),
      });

      if (response.ok) {
        const savedClient = await response.json();
        setClients([...clients, savedClient]);
        setSuccessMessage('Cliente registrado con éxito');
        setNewClient({ name: '', lastName: '', nit: '', phoneNumber: '' });
        setError('');
      } else {
        const errorText = await response.text();
        setError(`Error al registrar el cliente: ${errorText}`);
      }
    } catch (error) {
      setError(`Error de conexión: ${error.message}`);
    }
  };

  // Buscar un cliente por nombre
  const handleSearchClient = async (e) => {
    e.preventDefault();
    try {
      const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchName.toLowerCase())
      );
      if (filteredClients.length > 0) {
        setClients(filteredClients);
        setIsSearching(true);
        setSuccessMessage('Clientes encontrados');
        setError('');
      } else {
        setClients([]);
        setError('No se encontró ningún cliente con ese nombre');
      }
    } catch (error) {
      setError(`Error de conexión: ${error.message}`);
    }
  };

  // Mostrar todos los clientes después de una búsqueda
  const handleListClients = () => {
    fetchClients();
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="container">
      <h2>Lista de Clientes</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      <div>
        <button onClick={handleListClients}>Listar Todos</button>
        <form onSubmit={handleSearchClient} style={{ display: 'inline-block', marginLeft: '10px' }}>
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

      <table className="clients-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>NIT</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {clients.length > 0 ? (
            clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.lastName}</td>
                <td>{client.nit}</td>
                <td>{client.phoneNumber}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                {isSearching ? 'No se encontró ningún cliente con ese nombre' : 'No hay clientes registrados'}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Registrar Nuevo Cliente</h3>
      <form onSubmit={handleRegisterClient}>
        <input
          type="text"
          placeholder="Nombre"
          value={newClient.name}
          onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Apellido"
          value={newClient.lastName}
          onChange={(e) => setNewClient({ ...newClient, lastName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="NIT"
          value={newClient.nit}
          onChange={(e) => setNewClient({ ...newClient, nit: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={newClient.phoneNumber}
          onChange={(e) => setNewClient({ ...newClient, phoneNumber: e.target.value })}
          required
        />
        <button type="submit">Registrar Cliente</button>
      </form>
    </div>
  );
};

export default Clients;
