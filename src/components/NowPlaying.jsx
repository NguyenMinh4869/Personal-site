import React, { useEffect, useState } from 'react';
import { AiOutlinePauseCircle, AiFillPlayCircle } from 'react-icons/ai';
import { BiErrorCircle } from 'react-icons/bi';
import { HiOutlineStatusOffline } from 'react-icons/hi';
import { BsThreeDots } from 'react-icons/bs';
import { FaSpotify } from 'react-icons/fa';
import { getNowPlaying, getRecentlyPlayed } from '../lib/spotify';
import '../styles/NowPlaying.css';

const NowPlaying = () => {
  const [nowPlaying, setNowPlaying] = useState(null);
  const [recent, setRecent] = useState([]);
  const [featureBg, setFeatureBg] = useState('linear-gradient(145deg, #4338ca 0%, #312e81 100%)');
  const [recentBgs, setRecentBgs] = useState([]);

  useEffect(() => {
    let intervalId;
    const fetchNowPlaying = async () => {
      const data = await getNowPlaying();
      setNowPlaying(data);
    };
    const fetchRecent = async () => {
      const items = await getRecentlyPlayed(4);
      setRecent(items);
    };
    fetchNowPlaying();
    fetchRecent();
    intervalId = setInterval(() => {
      fetchNowPlaying();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  let playerState = '';
  let secondsPlayed = 0, minutesPlayed = 0, secondsTotal = 0, minutesTotal = 0;
  let albumImageUrl = '/images/albumCover.png';
  let title = '';
  let artist = '';

  if (nowPlaying != null && nowPlaying.title) {
    playerState = nowPlaying.isPlaying ? 'PLAY' : 'PAUSE';
    secondsPlayed = Math.floor(nowPlaying.timePlayed / 1000);
    minutesPlayed = Math.floor(secondsPlayed / 60);
    secondsPlayed = secondsPlayed % 60;
    secondsTotal = Math.floor(nowPlaying.timeTotal / 1000);
    minutesTotal = Math.floor(secondsTotal / 60);
    secondsTotal = secondsTotal % 60;
    albumImageUrl = nowPlaying.albumImageUrl;
    title = nowPlaying.title;
    artist = nowPlaying.artist;
  } else if (nowPlaying === 'Currently Not Playing') {
    playerState = 'OFFLINE';
    title = 'User is';
    artist = 'currently Offline';
  } else if (typeof nowPlaying === 'string') {
    title = 'Failed to';
    artist = 'fetch song';
  }

  const pad = (n) => {
    return n < 10 ? `0${n}` : n;
  };

  const toEmbedUrl = (url) => {
    if (!url) return '';
    const id = url.split('/track/')[1]?.split('?')[0];
    return id ? `https://open.spotify.com/embed/track/${id}` : url;
  };

  const href = playerState === 'PLAY' || playerState === 'PAUSE' ? toEmbedUrl(nowPlaying?.songUrl) : '';

  // Compute dominant/average color from album image to drive background
  // Helpers to compute gradient from image
  const getAverageColorFromImage = (url) => new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const width = 50;
        const height = 50;
        canvas.width = width;
        canvas.height = height;
        context.drawImage(img, 0, 0, width, height);
        const { data } = context.getImageData(0, 0, width, height);
        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < data.length; i += 4) {
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          count++;
        }
        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);
        resolve({ r, g, b });
      } catch {
        resolve({ r: 67, g: 56, b: 202 });
      }
    };
    img.onerror = () => resolve({ r: 67, g: 56, b: 202 });
  });

  const darken = (c, factor = 0.7) => ({
    r: Math.max(0, Math.floor(c.r * factor)),
    g: Math.max(0, Math.floor(c.g * factor)),
    b: Math.max(0, Math.floor(c.b * factor)),
  });

  const toGradient = (c) => {
    const d = darken(c, 0.55);
    const start = `rgb(${c.r}, ${c.g}, ${c.b})`;
    const end = `rgb(${d.r}, ${d.g}, ${d.b})`;
    return `linear-gradient(135deg, ${start} 0%, ${end} 100%)`;
  };

  // Update feature background when album image changes
  useEffect(() => {
    if (!albumImageUrl) return;
    (async () => {
      const avg = await getAverageColorFromImage(albumImageUrl);
      setFeatureBg(toGradient(avg));
    })();
  }, [albumImageUrl]);

  // Compute backgrounds for recent items
  useEffect(() => {
    if (!recent || recent.length === 0) return;
    (async () => {
      const colors = await Promise.all(
        recent.map((t) => getAverageColorFromImage(t.albumImageUrl))
      );
      const grads = colors.map((c) => toGradient(c));
      setRecentBgs(grads);
    })();
  }, [recent]);

  // Optional: set to true để dùng Spotify Embed thay thẻ custom
  const useEmbed = false;
  const useEmbedBackground = true; // dùng nền từ iframe embed thật
  const showFullEmbed = true; // hiển thị toàn bộ giao diện embed cột trái
  const showFullEmbedRight = true; // hiển thị embed cho danh sách cột phải

  return (
    <div className="np-container">
      <div className="np-header">
        <div className="np-title">Recently Played</div>
        <div className="np-tabs">
          <button className="np-tab active">Recently Played</button>
          <button className="np-tab">Top Tracks</button>
        </div>
      </div>
      <div className="np-grid">
        {showFullEmbed && href ? (
          <div className="np-embed-full">
            <iframe
              title="spotify-embed-full"
              src={href}
              width="100%"
              height="420"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        ) : (
        <a className="np-feature-link" href={href} style={{ textDecoration: 'none' }}>
          <div className="nowPlayingCard np-feature" style={{ background: useEmbedBackground ? 'transparent' : featureBg }}>
            {useEmbedBackground ? (
              <div className="np-embed-bg-iframe" aria-hidden>
                {href && (
                  <iframe
                    title="spotify-embed-bg"
                    src={`${href}?utm_source=bg`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="encrypted-media"
                  />
                )}
              </div>
            ) : (
              <div
                className="np-embed-bg"
                aria-hidden
                style={{ backgroundImage: `url(${albumImageUrl})` }}
              />
            )}
            <div className="np-feature-content">
              <div className="np-feature-spotify"><FaSpotify size={22} /></div>
              <div className="np-feature-art">
                <img src={albumImageUrl} alt="Album" />
              </div>
              <div className={`np-feature-title ${title.length > 20 ? 'marquee-content' : ''}`}>{title}</div>
              <div className="np-feature-artist">{artist}</div>
              <div className="np-feature-save">
                <span className="np-save-icon">+</span>
                <span>Lưu trên Spotify</span>
              </div>
              <div className="nowPlayingTime">{pad(minutesPlayed)}:{pad(secondsPlayed)} / {pad(minutesTotal)}:{pad(secondsTotal)}</div>
              <div className="np-feature-actions">
                <BsThreeDots size={28} className="action" />
                <AiFillPlayCircle size={44} className="action play" />
              </div>
            </div>
          </div>
        </a>
        )}
        {useEmbed && href && (
          <div style={{ gridColumn: '1 / span 1' }}>
            <iframe
              style={{ borderRadius: '12px', border: 'none' }}
              src={href}
              width="100%"
              height="400"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        )}
        {recent && recent.length > 0 && (
          <div className="np-list">
            {recent.slice(0, 4).map((t, idx) => (
              showFullEmbedRight ? (
                <div key={`${t.id}-${idx}`} className="np-embed-item">
                  <iframe
                    title={`spotify-embed-item-${idx}`}
                    src={toEmbedUrl(t.songUrl)}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  />
                </div>
              ) : (
                <a key={`${t.id}-${idx}`} href={toEmbedUrl(t.songUrl)} style={{ textDecoration: 'none' }}>
                  <div className="nowPlayingCard np-item" style={{ background: recentBgs[idx] }}>
                    <div className="nowPlayingImage">
                      <img src={t.albumImageUrl} alt="Album" />
                    </div>
                    <div id="nowPlayingDetails">
                      <div className="nowPlayingTitle">{t.title}</div>
                      <div className="nowPlayingArtist">{t.artists}</div>
                      <div className="nowPlayingTime">{Math.floor(t.durationMs/60000).toString().padStart(2,'0')}:{Math.floor((t.durationMs%60000)/1000).toString().padStart(2,'0')}</div>
                    </div>
                  </div>
                </a>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NowPlaying;


