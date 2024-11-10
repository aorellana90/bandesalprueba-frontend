import React, { useState, useEffect } from 'react';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetch('/pruebabandesal/blogs/getAll', {
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
          setBlogs(data.datos);
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
      <h1>Listado de Blogs</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog => (
            <tr key={blog.idBlog}>
              <td>{blog.idBlog}</td>
              <td>{blog.title}</td>
              <td>{blog.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Blogs;
