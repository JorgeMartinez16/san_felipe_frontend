import React, { useState, useEffect } from 'react';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [searchPlate, setSearchPlate] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const token = localStorage.getItem('token');

  // lista de autos
  const fetchCars = async () => {
    try {
      const response = await fetch('http://localhost:8080/cars', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error('Error al obtener la lista de autos');
      const data = await response.json();
      setCars(data);
      setIsSearching(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Buscar auto por placa
  const handleSearchCar = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/cars/${searchPlate}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const car = await response.json();
        setCars([car]);
        setSuccessMessage('Auto encontrado con éxito');
        setIsSearching(true);
        setError('');
      } else {
        setCars([]);
        setError('No se encontró ningún auto con esa placa');
      }
    } catch (error) {
      setError(`Error de conexión: ${error.message}`);
    }
  };

  // Eliminar auto
  const handleDeleteCar = async (licencePlate) => {
    try {
      const response = await fetch(`http://localhost:8080/cars/${licencePlate}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setCars(cars.filter((car) => car.licencePlate !== licencePlate));
        setSuccessMessage(`Auto con placa ${licencePlate} eliminado con éxito`);
        setError('');
      } else {
        const errorText = await response.text();
        setError(`Error al eliminar el auto: ${errorText}`);
      }
    } catch (error) {
      setError(`Error de conexión: ${error.message}`);
    }
  };

  const handleListCars = () => {
    fetchCars();
  };

  return (
    <div className="container">
      <h2>Lista de Autos</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}

      <div>
        <button onClick={handleListCars}>Listar Todos</button>
        <form onSubmit={handleSearchCar} style={{ display: 'inline-block', marginLeft: '10px' }}>
          <input
            type="text"
            placeholder="Buscar por Placa"
            value={searchPlate}
            onChange={(e) => setSearchPlate(e.target.value)}
            required
          />
          <button type="submit">Buscar</button>
        </form>
      </div>

      <table className="cars-table">
        <thead>
          <tr>
            <th>Placa</th>
            <th>Modelo</th>
            <th>Color</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cars.length > 0 ? (
            cars.map((car) => (
              <tr key={car.licencePlate}>
                <td>{car.licencePlate}</td>
                <td>{car.make}</td>
                <td>{car.color}</td>
                <td>
                  <button onClick={() => handleDeleteCar(car.licencePlate)} className="delete-button">Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>
                {isSearching ? 'No se encontró ningún auto con esa placa' : 'AUTOS LISTADOS'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Cars;
