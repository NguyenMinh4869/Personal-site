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

const Section = ({ title, children }) => (
  <section className="about-section">
    <h2 className="about-section-title">{title}</h2>
    <div className="about-section-body">
      {children}
    </div>
  </section>
);

const DraggableCard = ({ className, rotationDeg, delayClass, children }) => {
  const cardRef = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const startRef = useRef({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const onPointerDown = (e) => {
    // Prevent default ghost image dragging
    if (e.type === 'mousedown') {
      e.preventDefault();
    }
    
    // Bring clicked card to front
    const allCards = document.querySelectorAll('.collage-card');
    allCards.forEach(c => c.style.zIndex = '1');
    if (cardRef.current) {
      cardRef.current.style.zIndex = '50';
      // Smooth scale up effect when picked
      cardRef.current.style.transition = 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)';
      cardRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) rotate(${rotationDeg}deg) scale(1.05)`;
    }
    
    setIsDragging(true);
    const point = 'touches' in e ? e.touches[0] : e;
    startRef.current = { x: point.clientX - posRef.current.x, y: point.clientY - posRef.current.y };
    
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);
  };

  const onPointerMove = (e) => {
    const point = 'touches' in e ? e.touches[0] : e;
    if ('touches' in e && e.cancelable) e.preventDefault();
    
    const newX = point.clientX - startRef.current.x;
    const newY = point.clientY - startRef.current.y;
    posRef.current = { x: newX, y: newY };
    
    if (cardRef.current) {
      cardRef.current.style.transition = 'none'; 
      cardRef.current.style.transform = `translate(${newX}px, ${newY}px) rotate(${rotationDeg}deg) scale(1.05)`;
    }
  };

  const onPointerUp = () => {
    setIsDragging(false);
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      cardRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) rotate(${rotationDeg}deg) scale(1)`;
    }
    window.removeEventListener('mousemove', onPointerMove);
    window.removeEventListener('touchmove', onPointerMove);
    window.removeEventListener('mouseup', onPointerUp);
    window.removeEventListener('touchend', onPointerUp);
  };

  const initialTransform = `translate(${posRef.current.x}px, ${posRef.current.y}px) rotate(${rotationDeg}deg)`;

  return (
    <div
      ref={cardRef}
      className={`${className} ${isDragging ? 'dragging' : ''}`}
      style={{ transform: initialTransform }}
      onMouseDown={onPointerDown}
      onTouchStart={onPointerDown}
    >
      <div className={`enter-wrapper ${delayClass || ''}`}>
        {children}
      </div>
    </div>
  );
};

const About = () => {
  const { isDarkMode } = useDarkMode();

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

        {/* Photo collage */}
        <div className="photo-collage">
          <DraggableCard className="collage-card img-1" delayClass="delay-photo-1" rotationDeg={-6}>
            <div className="flip">
              <div className="front">
                <img src={img1} alt="memory-1" />
              </div>
              <div className="back">
                <div className="back-content">
                  <div className="back-title">September 2023</div>
                  <div className="back-sub">FM Cloth Store</div>
                  <p>Trying on clothes and realized I look too handsome</p>
                </div>
              </div>
            </div>
          </DraggableCard>

          <DraggableCard className="collage-card img-2" delayClass="delay-photo-2" rotationDeg={-2}>
            <div className="flip">
              <div className="front">
                <img src={img2} alt="memory-2" />
              </div>
              <div className="back">
                <div className="back-content">
                  <div className="back-title">August 2024</div>
                  <div className="back-sub">Boba with friends</div>
                  <p>At that time, I still had long hair T_T</p>
                </div>
              </div>
            </div>
          </DraggableCard>

          <DraggableCard className="collage-card img-3" delayClass="delay-photo-3" rotationDeg={4}>
            <div className="flip">
              <div className="front">
                <img src={img3} alt="memory-3" />
              </div>
              <div className="back">
                <div className="back-content">
                  <div className="back-title">June 2025</div>
                  <div className="back-sub">Binh Ba with my bois</div>
                  <p>This spot is truly gorgeous.</p>
                </div>
              </div>
            </div>
          </DraggableCard>

          <DraggableCard className="collage-card img-4" delayClass="delay-photo-4" rotationDeg={6}>
            <div className="flip">
              <div className="front">
                <img src={img4} alt="memory-4" />
              </div>
              <div className="back">
                <div className="back-content">
                  <div className="back-title">Feb 2024</div>
                  <div className="back-sub">The first day of the Lunar New Year</div>
                  <p>thinking about life :D</p>
                </div>
              </div>
            </div>
          </DraggableCard>
        </div>


        <div className="about-section section-aside-grid stagger-fade">
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
          <div className="grid grid-two">
            <div className="hobby">
              <div className="hobby-title">Editting</div>
              <div className="hobby-desc">I usually edit videos when I have free time</div>
              <a className="hobby-link" href="https://www.youtube.com/watch?v=X2H4AQGzK10">1 of my videos</a>
            </div>
            <div className="hobby">
              <div className="hobby-title">Video games</div>
              <div className="hobby-desc">Not too much but I still like to play them,...</div>
            </div>
            <div className="hobby">
              <div className="hobby-title">Hanging out with friends</div>
              <div className="hobby-desc">mostly hanging out and eating.</div>
            </div>
            <div className="hobby">
              <div className="hobby-title">Sleeping</div>
              <div className="hobby-desc">I can sleep for 10 hours</div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
};

export default About;


