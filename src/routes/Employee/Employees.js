import React, { useState, useEffect } from 'react';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const token = localStorage.getItem('token');

  // Obtener la lista de empleados
  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:8080/employees', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Error al obtener la lista de empleados');
      const data = await response.json();
      setEmployees(data);
      setIsSearching(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Buscar empleado por nombre
  const handleSearchEmployee = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/employees/${searchName}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const employee = await response.json();
        setEmployees([employee]);
        setSuccessMessage('Empleado encontrado con éxito');
        setIsSearching(true);
        setError('');
      } else {
        setEmployees([]);
        setError('No se encontró ningún empleado con ese nombre');
      }
    } catch (error) {
      setError(`Error de conexión: ${error.message}`);
    }
  };

  // Eliminar empleado
  const handleDeleteEmployee = async (employeeId) => {
    try {
      const response = await fetch(`http://localhost:8080/employees/${employeeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setEmployees(employees.filter((employee) => employee.id !== employeeId));
        setSuccessMessage(`Empleado eliminado con éxito`);
        setError('');
      } else {
        const errorText = await response.text();
        setError(`Error al eliminar el empleado: ${errorText}`);
      }
    } catch (error) {
      setError(`Error de conexión: ${error.message}`);
    }
  };

  const handleListEmployees = () => {
    fetchEmployees();
  };

  return (
    <div className="container">
      <h2>Lista de Empleados</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      <div>
        <button onClick={handleListEmployees}>Listar Todos</button>
        <form onSubmit={handleSearchEmployee} style={{ display: 'inline-block', marginLeft: '10px' }}>
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

      <table className="employees-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Posición</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.lastName}</td>
                <td>{employee.position}</td>
                <td>{employee.phoneNumber}</td>
                <td>
                  <button onClick={() => handleDeleteEmployee(employee.id)} className="delete-button">Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center' }}>
                {isSearching ? 'No se encontró ningún empleado con ese nombre' : 'EMPLEADOS LISTADOS'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Employees;
