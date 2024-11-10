import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/pruebabandesal/token/generar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        const token = data.token;

        localStorage.setItem('authToken', token);

        navigate('/main-menu');
      } else {
        setErrorMessage('Usuario o Clave incorrectos');
      }
    } catch (error) {
      console.error('Error al iniciar sesion: ', error);
      setErrorMessage('Error en la comunicacion con los servicios');
    }
  };

  return (
    <div className="login">
      <h2>Inicio de Sesión </h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
