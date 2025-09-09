import React from 'react';
import '../styles/Navbar.css';
import { useDarkMode } from '../contexts/DarkModeContext';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const location = useLocation();

  // Định nghĩa các route và vị trí của chúng
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  // Tìm index của route hiện tại
  const getCurrentIndex = () => {
    return navItems.findIndex(item => item.path === location.pathname);
  };

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
            <div className="nav-links-container">
              <ul className="nav-links">
                {navItems.map((item, index) => (
                  <li key={item.path}>
                    {item.path.startsWith('#') ? (
                      <a href={item.path} className="nav-link">
                        {item.label}
                      </a>
                    ) : (
                      <NavLink 
                        to={item.path} 
                        end 
                        className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                      >
                        {item.label}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
              
              {/* Animated background indicator */}
              <motion.div
                className="nav-indicator"
                layoutId="nav-indicator"
                initial={false}
                animate={{
                  x: getCurrentIndex() * (120 + 16), // 120px width + 16px gap
                  width: 120
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
              />
            </div>
          </div>
          
          {/* Right side - Dark mode toggle */}
          <div className="navbar-right">
            <button className="dark-mode-toggle" onClick={toggleDarkMode}>
              {isDarkMode ? (
                <svg className="sun-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="moon-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
