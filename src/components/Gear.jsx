import React from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';

const Gear = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`about-container ${isDarkMode ? 'dark' : ''}`}>
      <div className="about-content" style={{ paddingTop: '50px' }}>
        <h1 className="hero-title animate-fade-in-up delay-1">
          Gear
        </h1>
        <p className="hero-description animate-fade-in-up delay-2" style={{ marginTop: '0.5rem' }}>
          Welcome to the gear page. Content coming soon!
        </p>
      </div>
    </div>
  );
};

export default Gear;