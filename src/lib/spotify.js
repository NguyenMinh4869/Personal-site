// Setting up the Spotify API and Endpoints
export const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
export const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
export const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played';
export const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks';

// Read credentials from Vite env vars
// Stripping stray quotes or semicolons just in case they are defined in .env
const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID?.replace(/[';]/g, '') || '36fe464930874b2099d39fee34a5c972';
const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET?.replace(/[';]/g, '') || '7785a307452042318a4f4d67f23ce405';
const refresh_token = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN?.replace(/[';]/g, '') || 'AQCvXOh0TMDIdhzdAUR9KcazPVmYWMt_yv7ubkzHjofBrHDm0cKp3VARivm9Am8yC-G-KBGwfUYR-5wJO1uT15FeY0PYJ9Crz0jsVuvjWUO8fekiZOn2PfURLZH40Avuvqc';

// Function to generate an access token using the refresh token every time the website is opened or refreshed
export const getAccessToken = async (clientId = client_id, clientSecret = client_secret, refreshToken = refresh_token) => {
  const { Buffer } = await import('buffer');
  const querystring = (await import('querystring')).default;

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error('[Spotify] Token error:', response.status, text);
    throw new Error(`TokenError:${response.status}`);
  }

  return response.json();
};

// Uses the access token to fetch the currently playing song
export const getNowPlaying = async () => {
  try {
    const { access_token } = await getAccessToken();

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status === 204) {
      throw new Error('Currently Not Playing');
    } else if (response.status === 401) { // invalid/expired token or missing scope
      const text = await response.text();
      console.error('[Spotify] 401 Unauthorized:', text);
      throw new Error('Unauthorized: Check scopes and refresh token');
    } else if (response.status === 403) { // insufficient scope
      const text = await response.text();
      console.error('[Spotify] 403 Forbidden:', text);
      throw new Error('Forbidden: Missing user-read-currently-playing scope');
    } else if (response.status >= 400) {
      const text = await response.text();
      console.error('[Spotify] Fetch error:', response.status, text);
      throw new Error('Unable to Fetch Song');
    }

    const song = await response.json();
    const albumImageUrl = song.item.album.images[0].url;
    const artist = song.item.artists.map((a) => a.name).join(', ');
    const isPlaying = song.is_playing;
    const songUrl = song.item.external_urls.spotify;
    const title = song.item.name;
    const timePlayed = song.progress_ms;
    const timeTotal = song.item.duration_ms;
    const artistUrl = song.item.album.artists[0].external_urls.spotify;

    return {
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
      timePlayed,
      timeTotal,
      artistUrl,
    };
  } catch (error) {
    console.error('Error fetching currently playing song: ', error);
    return error.message.toString();
  }
};


// Fetch 4 recently played tracks
export const getRecentlyPlayed = async (limit = 4) => {
  try {
    const { access_token } = await getAccessToken();

    const url = `${RECENTLY_PLAYED_ENDPOINT}?limit=${encodeURIComponent(limit)}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status === 401) {
      const text = await response.text();
      console.error('[Spotify] 401 Unauthorized (recently played):', text);
      throw new Error('Unauthorized: Check scopes and refresh token');
    } else if (response.status === 403) {
      const text = await response.text();
      console.error('[Spotify] 403 Forbidden (recently played):', text);
      throw new Error('Forbidden: Missing user-read-recently-played scope');
    } else if (!response.ok) {
      const text = await response.text();
      console.error('[Spotify] Fetch error (recently played):', response.status, text);
      throw new Error('Unable to fetch recently played');
    }

    const data = await response.json();
    // Normalize to simple array of tracks
    const tracks = (data.items || []).map((item) => {
      const track = item.track;
      const durationMs = track.duration_ms;
      return {
        id: track.id,
        title: track.name,
        artists: track.artists.map((a) => a.name).join(', '),
        songUrl: track.external_urls.spotify,
        albumImageUrl: track.album?.images?.[0]?.url,
        durationMs,
      };
    });

    return tracks;
  } catch (error) {
    console.error('Error fetching recently played: ', error);
    return [];
  }
};

// Fetch Top Tracks
export const getTopTracks = async (limit = 5) => {
  try {
    const { access_token } = await getAccessToken();

    const url = `${TOP_TRACKS_ENDPOINT}?time_range=short_term&limit=${encodeURIComponent(limit)}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('[Spotify] Fetch top tracks error:', response.status, text);
      return [];
    }

    const data = await response.json();
    return (data.items || []).map((track) => ({
      id: track.id,
      title: track.name,
      artists: track.artists.map((a) => a.name).join(', '),
      songUrl: track.external_urls.spotify,
      albumImageUrl: track.album?.images?.[0]?.url,
      durationMs: track.duration_ms,
    }));
  } catch (error) {
    console.error('Error fetching top tracks: ', error);
    return [];
  }
};


