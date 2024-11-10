import React, { useState, useEffect } from 'react';

const ReadersByBlog = () => {
  const [readersByBlog, setReadersByBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetch('/pruebabandesal/blogsreaders/getAll', {
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
          setReadersByBlog(data.datos);
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
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Listado de Lectores por Blog</h1>
      <table>
        <thead>
          <tr>
            <th>Correlativo</th>
            <th>Título del Blog</th>
            <th>Descripción del Blog</th>
            <th>Nombre del Reader</th>
          </tr>
        </thead>
        <tbody>
          {readersByBlog.map(entry => (
            <tr key={entry.idBlogReader}>
              <td>{entry.idBlogReader}</td>
              <td>{entry.blog.title}</td>
              <td>{entry.blog.description}</td>
              <td>{entry.reader.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReadersByBlog;
