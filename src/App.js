import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import Login from './components/Login';
import Readers from './components/Readers';
import Blogs from './components/Blogs';
import ReadersByBlog from './components/ReadersByBlog';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main-menu" element={<MainMenu />} />
        <Route path="/readers" element={<Readers />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/readers-by-blog" element={<ReadersByBlog />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
