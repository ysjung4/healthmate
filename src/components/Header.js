import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="logo">HealthMate</div>
        <nav>
          <ul className="nav-links">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/symptoms">Symptom Checker</NavLink></li>
            <li><NavLink to="/find-hospital">Find Hospital</NavLink></li>
            <li><NavLink to="/medicine">MedicineFinder</NavLink></li>
            <li><NavLink to="/livewell">LiveWellTips</NavLink></li>
          </ul>
        </nav>
      </div>
    
    </header>
   
  );
}

export default Header;
