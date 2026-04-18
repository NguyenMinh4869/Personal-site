import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PhotoCard = ({ image, date, location, caption }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseEnter = () => {
    if (!isMobile) setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    if (!isMobile) setIsFlipped(false);
  };

  const handleClick = (e) => {
    // Prevent dragging from firing the click immediately if needed
    if (isMobile) {
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <motion.div
      className="flip"
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ 
        duration: 0.6,
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{ cursor: isMobile ? 'default' : 'inherit' }}
    >
      <div className="front">
        <img
          src={image}
          alt={caption}
          draggable={false}
        />
      </div>

      <div className="back">
        <div className="back-content">
          <div className="back-title">{date}</div>
          <div className="back-sub">{location}</div>
          <p>{caption}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default PhotoCard;
