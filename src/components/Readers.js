import React, { useState, useEffect } from 'react';

const Readers = () => {
  const [readers, setReaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const loadReaders = () => {
    const token = localStorage.getItem('authToken');

    if (token) {
      fetch('/pruebabandesal/readers/getAll', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la comunicacion con el servicio');
          }
          return response.json();
        })
        .then(data => {
          setReaders(data.datos);
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    } else {
      setError('No se pudo recuperar el Token de la sesion');
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReaders();
  }, []);

  const handleSaveReader = () => {
    const token = localStorage.getItem('authToken');

    if (!name.trim()) {
      setMessage('El nombre del lector no puede estar vacío.');
      return;
    }

    fetch('/pruebabandesal/readers/save', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la comunicacion con el servicio');
        }
        return response.json();
      })
      .then(data => {
        setMessage(data.datos);
        setName('');
        setError(null);
        loadReaders();
      })
      .catch(error => {
        if (error.message.includes('BAD_REQUEST')) {
          setMessage('Error: ' + error.message);
        } else {
          setMessage('Error al guardar el Lector');
        }
      });
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Lista de Readers</h1>
      <br />
      <div>
        <h2>Agregar nuevo lector</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ingrese el nombre del lector"
        />
        <br />
        <button onClick={handleSaveReader}>Guardar</button>
        {message && <p>{message}</p>}
      </div>

      <br />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {readers.map(reader => (
            <tr key={reader.idReader}>
              <td>{reader.idReader}</td>
              <td>{reader.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Readers;
