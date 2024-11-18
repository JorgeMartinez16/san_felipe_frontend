import React, { useState } from 'react';

function RegisterClient() {
  const [clientName, setClientName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nit, setNit] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newClient = {
      name: clientName,
      lastName: lastName,
      nit: nit,
      phoneNumber: phone,
    };

    try {
      const response = await fetch('http://localhost:8080/clients/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClient),
      });

      if (response.ok) {
        console.log('Cliente registrado con éxito');
      } else {
        console.error('Error al registrar el cliente');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  };

  return (
    <div className="container">
      <h2>Registrar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Nombre del cliente" 
          value={clientName} 
          onChange={(e) => setClientName(e.target.value)} 
          required
        />
        <input 
          type="text" 
          placeholder="Apellido" 
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)} 
          required
        />
        <input 
          type="text" 
          placeholder="NIT" 
          value={nit} 
          onChange={(e) => setNit(e.target.value)} 
          required
        />
        <input 
          type="tel" 
          placeholder="Teléfono" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          required
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default RegisterClient;
