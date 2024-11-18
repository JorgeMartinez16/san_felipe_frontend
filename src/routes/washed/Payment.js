import React, { useState } from 'react';
import axios from 'axios';

function Payment() {
  const [employeeId, setEmployeeId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [payment, setPayment] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const response = await axios.get(
        `http://localhost:8080/washed/employee/${employeeId}/payment`,
        {
          params: {
            startDate,
            endDate,
          },
        }
      );
      setPayment(response.data);
    } catch (err) {
      setError('Error al calcular el pago. Verifica los datos ingresados.');
    }
  };

  return (
    <div className="container">
      <h2>Calcular Pago</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Empleado ID:</label>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha de inicio:</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha de fin:</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Calcular</button>
      </form>
      {payment !== null && (
        <div>
          <h3>Pago calculado: ${payment.toFixed(2)}</h3>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Payment;
