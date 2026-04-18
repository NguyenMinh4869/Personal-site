import React, { useState, useEffect } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import "../styles/Home.css";
import NowPlaying from './NowPlaying';

const Home = () => {
  const { isDarkMode } = useDarkMode();
  const [displayedText, setDisplayedText] = useState('');
  const fullText ="hello, Minh here";
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100); // Tốc độ gõ text (100ms mỗi ký tự)

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  return (
    <div className={`home-container ${isDarkMode ? 'dark' : ''}`}>
      <div className="home-content">
        <div className="hero-section" style={{ paddingTop: '50px' }}>
          <h1 className="hero-title animate-fade-in-up delay-1">
            {displayedText}
          </h1>
          <p className="hero-description animate-fade-in-up delay-2" style={{ marginTop: '0.5rem' }}>
          your average university student majoring in IT trying to document the struggles of becoming a software engineer.
          </p>
        </div>
        <div style={{ marginTop: '32px' }} className="animate-fade-in-up delay-3">
          <NowPlaying />
        </div>
      </div>
    </div>
  );
};

export default Home;