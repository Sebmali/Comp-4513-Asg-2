import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { supabase } from './Supabase/supabaseClient'
import LoginPage from "./components/LoginPage/LoginPage.jsx"
import './App.css'

// Existing views
import GalleryView from './components/GalleyView/GalleryView'
import ArtistView from './components/ArtistView/ArtistView'

// Import your new GenreView
import GenreView from './components/GenreView/GenreView'

function App() {
  const [galleries, setGalleries] = useState([]);
  const [paintings, setPaintings] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);  // <--- NEW
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch galleries
  useEffect(() => {
    async function fetchGalleries() {
      try {
        const { data, error } = await supabase.from('galleries').select('*');
        if (error) throw error;
        setGalleries(data);
      } catch (error) {
        console.error('Error fetching galleries: ', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchGalleries();
  }, []);

  // Fetch paintings
  useEffect(() => {
    async function fetchPaintings() {
      try {
        const { data, error } = await supabase.from('paintings').select('*');
        if (error) throw error;
        const paintingsWithThumbnails = data.map(painting => ({
          ...painting,
          thumbnailUrl: `https://res.cloudinary.com/funwebdev/image/upload/w_150/art/paintings/square/${painting.imageFileName
            .toString()
            .padStart(6, '0')}.jpg`
        }));
        setPaintings(paintingsWithThumbnails);
      } catch (error) {
        console.error('Error fetching paintings: ', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPaintings();
  }, []);

  // Fetch artists
  useEffect(() => {
    async function fetchArtists() {
      try {
        const { data, error } = await supabase.from('artists').select('*');
        if (error) throw error;
        setArtists(data);
      } catch (error) {
        console.error('Error fetching artists: ', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchArtists();
  }, []);

  // Fetch genres (NEW)
  useEffect(() => {
    async function fetchGenres() {
      try {
        const { data, error } = await supabase.from('genres').select('*');
        if (error) throw error;
        setGenres(data);
      } catch (error) {
        console.error('Error fetching genres: ', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchGenres();
  }, []);

  if (loading) {
    return <div className="p-4 text-gray-100">Loading...</div>;
  }
  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Login route */}
        <Route path="/" element={<LoginPage />} />

        {/* Galleries route */}
        <Route
          path="/galleries"
          element={
            <GalleryView
              galleries={galleries}
              paintings={paintings}
              artists={artists}
            />
          }
        />

        {/* Artists route */}
        <Route
          path="/artists"
          element={
            <ArtistView
              artists={artists}
              paintings={paintings}
            />
          }
        />

        {/* NEW: Genre route */}
        <Route
          path="/genres"
          element={
            <GenreView
              genres={genres}
              paintings={paintings}
              artists={artists}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
