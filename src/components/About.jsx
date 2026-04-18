import React, { useEffect, useRef, useState } from 'react';
import { useDarkMode } from '../contexts/DarkModeContext';
import '../styles/About.css';
import img1 from '../assets/anh1.jpg';
import img2 from '../assets/anh5.jpg';
import img3 from '../assets/anh3.jpg';
import img4 from '../assets/anh4.jpg';
import movieTheaterPreview from '../assets/movie theater.png';
import netflixPreview from '../assets/net-flix.png';
import personalWebsitePreview from '../assets/personal site.png';
import toyStoryPreview from '../assets/toy-story.png';
import PhotoCard from './PhotoCard';

const Section = ({ title, children }) => (
  <section className="about-section">
    <h2 className="about-section-title">{title}</h2>
    <div className="about-section-body">
      {children}
    </div>
  </section>
);

// Custom DraggableCard has been cleanly replaced by Framer Motion's built-in <motion.div drag /> mechanics.
import { motion } from 'framer-motion';

const photosData = [
  {
    image: img1,
    date: "September 2023",
    location: "FM Cloth Store",
    caption: "Trying on clothes and realized I look too handsome",
    style: "img-1",
    rotationDeg: -6
  },
  {
    image: img2,
    date: "August 2024",
    location: "Boba with friends",
    caption: "At that time, I still had long hair T_T",
    style: "img-2",
    rotationDeg: -2
  },
  {
    image: img3,
    date: "June 2025",
    location: "Binh Ba with my bois",
    caption: "This spot is truly gorgeous.",
    style: "img-3",
    rotationDeg: 4
  },
  {
    image: img4,
    date: "Feb 2024",
    location: "The first day of the Lunar New Year",
    caption: "thinking about life :D",
    style: "img-4",
    rotationDeg: 6
  }
];

const About = () => {
  const { isDarkMode } = useDarkMode();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // add page fade once on mount
    const root = document.querySelector('.about-content');
    if (root) {
      root.classList.add('page-fade-in');
    }
  }, []);

  return (
    <div className={`about-container ${isDarkMode ? 'dark' : ''}`}>
      <div className="about-content">
        <header className="about-header">
          <h1 className="about-title animate-fade-in-up delay-1">About me.</h1>
          <p className="about-subtitle animate-fade-in-up delay-2">Welcome to my personal space where I share my journey, projects, and experiences.</p>
        </header>

        {/* Framer Motion Photo Gallery integrated from user's snippet */}
        <motion.div 
          className="photo-collage"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {photosData.map((photo, index) => (
            <motion.div
              key={index}
              className={`collage-card ${photo.style}`}
              custom={index}
              initial={{ opacity: 0, y: 150, scale: 0.85, rotate: photo.rotationDeg - 8 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: photo.rotationDeg }}
              transition={{ 
                delay: index * 0.15, 
                duration: 0.8, 
                type: "spring", stiffness: 200, damping: 20 
              }}
              style={{ zIndex: 10 + index }}
              drag={!isMobile}
              dragConstraints={{
                top: -100,
                left: -350,
                right: 350,
                bottom: 250
              }}
              dragElastic={0.1}
              whileHover={!isMobile ? { scale: 1.05, zIndex: 50 } : undefined}
              whileDrag={{ scale: 1.1, zIndex: 100, cursor: 'grabbing' }}
            >
              <PhotoCard 
                image={photo.image}
                date={photo.date}
                location={photo.location}
                caption={photo.caption}
              />
            </motion.div>
          ))}
        </motion.div>


        <div className="about-section stagger-fade">
          <h2 className="about-section-title">Projects</h2>
          <div className="project-list">
            <div className="project-item">
              <div className="project-main">
                <a href="https://github.com/NguyenMinh4869/Movie-Theater" target="_blank" rel="noopener noreferrer" className="project-link">
                  <div className="project-name">Movie Theater</div>
                </a>
                <div className="project-desc">Project to manage showtimes, bookings, and customer information; easy-to-use for both staff and customers.</div>
              </div>
              <div className="project-tags badges">
                <span className="badge-csharp">C#</span>
                <span className="badge-js">JavaScript</span>
                <span className="badge-css">CSS</span>
                <span className="badge-html">HTML</span>
              </div>
              <div className="project-preview"><img src={movieTheaterPreview} alt="Movie Theater Preview" /></div>
            </div>

            <div className="project-item">
              <div className="project-main">
                <a href="https://github.com/NguyenMinh4869/netflix-clone" target="_blank" rel="noopener noreferrer" className="project-link">
                  <div className="project-name">Netflix Clone</div>
                </a>
                <div className="project-desc">Browse and stream movies with Firebase auth, categories from TheMovieDB, embedded YouTube trailers, and a fast React + Vite stack.</div>
              </div>
              <div className="project-tags badges">
                <span className="badge-react">React</span>
                <span className="badge-firebase">Firebase</span>
                <span className="badge-tmdb">TheMovieDB</span>
                <span className="badge-js">JavaScript</span>
              </div>
              <div className="project-preview"><img src={netflixPreview} alt="Netflix Clone Preview" /></div>
            </div>

            <div className="project-item">
              <div className="project-main">
                <a href="https://github.com/NguyenMinh4869/Personal-site" target="_blank" rel="noopener noreferrer" className="project-link">
                  <div className="project-name">Personal Website</div>
                </a>
                <div className="project-desc">Portfolio site with dark mode, interactive collage, Spotify integration, and project showcase.</div>
              </div>
              <div className="project-tags badges">
                <span className="badge-react">React</span>
                <span className="badge-spotify">Spotify API</span>
                <span className="badge-js">JavaScript</span>
                <span className="badge-tailwind">Tailwind</span>
              </div>
              <div className="project-preview"><img src={personalWebsitePreview} alt="Personal Website Preview" /></div>
            </div>

            <div className="project-item">
              <div className="project-main">
                <a href="https://github.com/NguyenMinh4869/toy-story-fe" target="_blank" rel="noopener noreferrer" className="project-link">
                  <div className="project-name">Toy Story</div>
                </a>
                <div className="project-desc">A modern, high-performance e-commerce frontend built with React and TypeScript. This repository contains the source code for the Toy Story online store, featuring a sleek design and seamless user experience.</div>
              </div>
              <div className="project-tags badges">
                <span className="badge-react">React</span>
                <span className="badge-typescript">TypeScript</span>
                <span className="badge-js">JavaScript</span>
              </div>
              <div className="project-preview"><img src={toyStoryPreview} alt="Toy Story Preview" /></div>
            </div>
          </div>
        </div>

        <Section title="Timeline">
          <ul className="timeline stagger-fade">




            <li className="timeline-item animate-fade-in-up delay-1">
              <div className="timeline-left">
                <span className="dot dot-red" />
                <div>
                  <div className="item-title">FPT Software</div>
                  <div className="item-subtitle">Software Development Engineer Intern</div>

                </div>
              </div>
              <div className="timeline-right">05/2025 - 08/2025</div>
            </li>
          </ul>
        </Section>


        <Section title="Hobbies">
          <div className="grid">
            <div className="hobby">
              <div className="hobby-title">Editing</div>
              <div className="hobby-desc">I usually edit videos when I have free time</div>
              <a className="hobby-link" href="https://www.youtube.com/watch?v=X2H4AQGzK10" target="_blank" rel="noopener noreferrer">
                <div className="hobby-stat stat-red">1 of my videos</div>
              </a>
            </div>
            <div className="hobby">
              <div className="hobby-title">Video games</div>
              <div className="hobby-desc">Not too much but I still like to play them,...</div>
              <div className="hobby-stat stat-blue">Gaming sessions</div>
            </div>
            <div className="hobby">
              <div className="hobby-title">Hanging out with friends</div>
              <div className="hobby-desc">mostly hanging out and eating.</div>
              <div className="hobby-stat stat-green">Good times</div>
            </div>
            <div className="hobby">
              <div className="hobby-title">Sleeping</div>
              <div className="hobby-desc">I can sleep for 10 hours</div>
              <div className="hobby-stat stat-purple">Resting well</div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default About;


