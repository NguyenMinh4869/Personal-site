import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDarkMode } from '../contexts/DarkModeContext';
import { getNowPlaying, getRecentlyPlayed, getTopTracks } from '../lib/spotify';
import '../styles/NowPlaying.css';

// ------------------------------------------------------------------
// Helper Component: Spotify Embed (Replacing react-spotify-embed)
// ------------------------------------------------------------------
const SpotifyEmbed = ({ url, wide, className = "" }) => {
  if (!url) return null;
  const id = url.split('/track/')[1]?.split('?')[0];
  if (!id) return null;
  
  // Theme parameter can be added (theme=0 is dark, theme=1 is light usually, but Spotify auto-detects based on system/embed context or we just let it be default)
  const src = `https://open.spotify.com/embed/track/${id}?utm_source=generator`;
  
  return (
    <div className={`spotify-embed-container ${className}`}>
      <iframe
        src={src}
        width="100%"
        height={wide ? "80" : "352"}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        style={{ borderRadius: '12px' }}
      />
    </div>
  );
};

// ------------------------------------------------------------------
// Main Component
// ------------------------------------------------------------------
const NowPlaying = () => {
  const { isDarkMode } = useDarkMode();
  const [activeList, setActiveList] = useState('recent'); // 'recent' | 'top'
  
  const [currentTrack, setCurrentTrack] = useState(null);
  const [recentTracks, setRecentTracks] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  
  const [displayTrack, setDisplayTrack] = useState(null);
  const [tracksList, setTracksList] = useState([]);
  
  const tracksRef = useRef(null);

  useEffect(() => {
    let intervalId;
    
    const fetchNowPlaying = async () => {
      const data = await getNowPlaying();
      if (data && data.title && data.title !== 'User is' && data.title !== 'Failed to') {
        setCurrentTrack({
          id: data.title, // Use title as fallback ID
          songUrl: data.songUrl,
          albumImageUrl: data.albumImageUrl,
          title: data.title,
          artists: data.artist
        });
      } else {
        setCurrentTrack(null);
      }
    };
    
    const fetchLists = async () => {
      // Fetch 5 to ensure we have 4 to show even if current track is excluded (logic can be expanded)
      const recent = await getRecentlyPlayed(5);
      setRecentTracks(recent);
      
      const top = await getTopTracks(5);
      setTopTracks(top);
    };

    fetchNowPlaying();
    fetchLists();
    
    // Poll Now Playing status every 10 seconds
    intervalId = setInterval(() => {
      fetchNowPlaying();
    }, 10000); 
    
    return () => clearInterval(intervalId);
  }, []);

  // Update Displayed Info whenever List Type or Data changes
  useEffect(() => {
    if (currentTrack) {
      setDisplayTrack(currentTrack);
      if (activeList === 'top') {
        setTracksList(topTracks.slice(0, 4));
      } else {
        setTracksList(recentTracks.slice(0, 4));
      }
    } else {
      if (activeList === 'top' && topTracks.length > 0) {
        setDisplayTrack(topTracks[0]);
        setTracksList(topTracks.slice(1, 5));
      } else if (recentTracks.length > 0) {
        setDisplayTrack(recentTracks[0]);
        setTracksList(recentTracks.slice(1, 5));
      } else {
        // Fallback clear
        setDisplayTrack(null);
        setTracksList([]);
      }
    }
  }, [activeList, currentTrack, recentTracks, topTracks]);

  const handleTabClick = (type) => {
    setActiveList(type);
    
    if (tracksRef.current) {
      const rect = tracksRef.current.getBoundingClientRect();
      const isFullyVisible = (rect.top >= 0 && rect.bottom <= window.innerHeight);
      
      if (!isFullyVisible) {
        tracksRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  return (
    <div className={`sp-container ${isDarkMode ? 'dark' : ''}`}>
      {/* Header */}
      <div className={`sp-header ${displayTrack ? 'hide-mobile' : ''}`}>
        <h2 className="sp-title">
          {currentTrack ? 'Now Playing' : (activeList === 'top' ? '#1 Track This Month' : 'Recently Played')}
        </h2>
        
        <div className="sp-tabs">
          <button
            onClick={() => handleTabClick('recent')}
            className={`sp-tab-btn ${activeList === 'recent' ? 'active' : ''}`}
          >
            Recently Played
          </button>
          <button
            onClick={() => handleTabClick('top')}
            className={`sp-tab-btn ${activeList === 'top' ? 'active' : ''}`}
          >
            Top Tracks
          </button>
        </div>
      </div>

      <div className="sp-content">
        {/* Main Track Display (Left Column) */}
        <div className="sp-main">
          {/* Mobile Title */}
          <div className="sp-mobile-title">
            <h2 className="sp-title">
              {currentTrack ? 'Now Playing' : (activeList === 'top' ? '#1 Track This Month' : 'Recently Played')}
            </h2>
          </div>
          
          <AnimatePresence mode="sync">
            {displayTrack && (
              <motion.div
                key={displayTrack.songUrl} // Re-animate when the main song changes
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="sp-main-player"
              >
                {/* Mobile version uses wide embed, Desktop uses tall embed */}
                <SpotifyEmbed wide={true} url={displayTrack.songUrl} className="sp-embed-mobile" />
                <SpotifyEmbed wide={false} url={displayTrack.songUrl} className="sp-embed-desktop" />

                {/* Mobile Tabs in main display when a song plays */}
                <div className="sp-mobile-tabs">
                  <div className="sp-tabs">
                    <button
                      onClick={() => handleTabClick('recent')}
                      className={`sp-tab-btn ${activeList === 'recent' ? 'active' : ''}`}
                    >
                      Recently Played
                    </button>
                    <button
                      onClick={() => handleTabClick('top')}
                      className={`sp-tab-btn ${activeList === 'top' ? 'active' : ''}`}
                    >
                      Top Tracks
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tracks List (Right Column) */}
        <div ref={tracksRef} className="sp-list">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeList} // Re-animate entire list when switching tabs
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="sp-list-grid">
                {tracksList.map((track, i) => (
                  <motion.div
                    key={track.songUrl + i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.15 }}
                  >
                    <SpotifyEmbed wide={true} url={track.songUrl} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;
