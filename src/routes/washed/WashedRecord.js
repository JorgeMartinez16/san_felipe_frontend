import React from 'react';

function WashedRecord({ record }) {
  return (
    <div className="container">
      <h2>Registro de Lavados</h2>
      <p>Placa: {record.plate}</p>
      <p>Lavador: {record.washer}</p>
      <p>Fecha: {record.date}</p>
    </div>
  );
}

export default WashedRecord;
