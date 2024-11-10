import React from 'react';
import { Link } from 'react-router-dom';

const MainMenu = () => {
  return (
    <div className="app-container">
      <header className="header">
        <h1>GLOBAL BLOG</h1>
      </header>
      <div className="main-content">
        <div className="content">
          <nav className="main-menu">
            <h3>Menú principal</h3>
            <ul>
              <li><Link to="/readers">- Readers</Link></li>
              <li><Link to="/blogs">- Blogs</Link></li>
              <li><Link to="/readers-by-blog">- Readers por blog</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
