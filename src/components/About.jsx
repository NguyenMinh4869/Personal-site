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

const Section = ({ title, children }) => (
  <section className="about-section">
    <h2 className="about-section-title">{title}</h2>
    <div className="about-section-body">
      {children}
    </div>
  </section>
);

const DraggableCard = ({ className, rotationDeg, children }) => {
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const startRef = useRef({ x: 0, y: 0 });

  const onPointerDown = (e) => {
    setDragging(true);
    const point = 'touches' in e ? e.touches[0] : e;
    startRef.current = { x: point.clientX - delta.x, y: point.clientY - delta.y };
    // Disable transition while dragging for immediate response
    e.currentTarget.style.transition = 'none';
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('touchend', onPointerUp);
  };

  const onPointerMove = (e) => {
    const point = 'touches' in e ? e.touches[0] : e;
    if ('touches' in e) e.preventDefault();
    setDelta({ x: point.clientX - startRef.current.x, y: point.clientY - startRef.current.y });
  };

  const onPointerUp = () => {
    setDragging(false);
    // Re-enable transition for smooth return
    const card = document.querySelector(`.${className.split(' ')[0]}`);
    if (card) card.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    window.removeEventListener('mousemove', onPointerMove);
    window.removeEventListener('touchmove', onPointerMove);
    window.removeEventListener('mouseup', onPointerUp);
    window.removeEventListener('touchend', onPointerUp);
  };

  const transform = `translate(${delta.x}px, ${delta.y}px) rotate(${rotationDeg}deg)`;

  return (
    <div
      className={`${className} ${dragging ? 'dragging' : ''}`}
      style={{ transform }}
      onMouseDown={onPointerDown}
      onTouchStart={onPointerDown}
    >
      {children}
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
          <DraggableCard className="collage-card img-1" rotationDeg={-6}>
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

          <DraggableCard className="collage-card img-2" rotationDeg={-2}>
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

          <DraggableCard className="collage-card img-3" rotationDeg={4}>
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

          <DraggableCard className="collage-card img-4" rotationDeg={6}>
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
                <span className="badge-node">Spotify Web API</span>
              </div>
              <div className="project-preview"><img src={personalWebsitePreview} alt="Personal Website Preview" /></div>
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
                  <div className="item-subtitle">Intern</div>
                 
                </div>
              </div>
              <div className="timeline-right">05/2025 - 08/2025</div>
            </li>
          </ul>
        </Section>


        <Section title="Hobbies">
          <div className="grid grid-two">
            <div className="hobby">
              <div className="hobby-title">Editor</div>
              <div className="hobby-desc">I usually edit videos when I have free time</div>
              <a className="hobby-link" href="https://www.youtube.com/watch?v=X2H4AQGzK10">1 of my videos</a>
            </div>
            <div className="hobby">
              <div className="hobby-title">Video games</div>
              <div className="hobby-desc">Such as Valorant, LOL,...</div>
            </div>
            <div className="hobby">
              <div className="hobby-title">Hang out with friends</div>
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


