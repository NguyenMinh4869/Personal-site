import React, { useState, useEffect } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import "../styles/Home.css";

const Home = () => {
  const { isDarkMode } = useDarkMode();
  const [displayedText, setDisplayedText] = useState('');
  const fullText = "hello, I'm Minh";
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
        <div className="hero-section">
          <h1 className="hero-title">
            {displayedText}
          </h1>
          <p className="hero-description">
            For now I really dont know what should I write here so he. he. he.
          </p>
        </div>
        
       
      </div>
    </div>
  );
};

export default Home;