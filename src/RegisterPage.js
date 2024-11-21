import React, { useState } from 'react';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');  // Campo para repetir la contraseña
  const [email, setEmail] = useState('');  // Campo para el correo electrónico
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Verificamos que las contraseñas coinciden
    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      setSuccessMessage('');
      return;
    }

    // Verificamos  que el correo tiene un formato válido
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      setErrorMessage('El correo electrónico no es válido');
      setSuccessMessage('');
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,  
        }),
      });

      if (response.ok) {
        setSuccessMessage('Usuario registrado con éxito');
        setErrorMessage('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setEmail('');
      } else {
        const errorText = await response.text();
        setErrorMessage(`Error al registrar usuario: ${errorText}`);
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage(`Error de conexión: ${error.message}`);
      setSuccessMessage('');
    }
  };

  return (
    <div className="container">
      <h2>Registrarse</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Repetir contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
         <input
          type="email"  
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Registrarse</button>
      </form>

      {errorMessage && <div className="error">{errorMessage}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
    </div>
  );
};

export default RegisterPage;
