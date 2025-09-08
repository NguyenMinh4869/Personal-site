import React from 'react';
import '../styles/Navbar.css';
import { useDarkMode } from '../contexts/DarkModeContext';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={`navbar-container ${isDarkMode ? 'dark' : ''}`}>
      {/* Top thin black line */}
      <div className="top-line"></div>
      
      {/* Main navigation */}
      <nav className="navbar">
        <div className="navbar-content">
          {/* Left side - Profile image */}
          <div className="navbar-left">
            <div className="profile-image">
              <img 
                src="https://jbagy.me/wp-content/uploads/2025/03/Hinh-anh-avatar-anime-nu-cute-2.jpg" 
                alt="Profile" 
              />
            </div>
          </div>
          
          {/* Center - Navigation links */}
          <div className="navbar-center">
            <ul className="nav-links">
              <li>
                <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  About
                </NavLink>
              </li>
              <li><a href="#" className="nav-link">Gear</a></li>
              <li><a href="#" className="nav-link">Contact</a></li>
            </ul>
          </div>
          
          {/* Right side - Dark mode toggle */}
          <div className="navbar-right">
            <button className="dark-mode-toggle" onClick={toggleDarkMode}>
              <svg className="moon-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
