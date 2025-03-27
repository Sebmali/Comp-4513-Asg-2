import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { supabase } from './Supabase/supabaseClient'
import LoginPage from "./LoginPage.jsx"
import './App.css'
import GalleryView from './components/GalleyView/GalleryView'

function App() {
  const [galleries, setGalleries] = useState([]);
  const [paintings, setPaintings] = useState([]);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch galleries from Supabase
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

  // Fetch paintings from Supabase
  useEffect(() => {
    async function fetchPaintings() {
      try {
        const { data, error } = await supabase.from('paintings').select('*');
        if (error) throw error;

        const paintingsWithThumbnails = data.map(painting => ({
          ...painting,
          thumbnailUrl: `https://res.cloudinary.com/funwebdev/image/upload/w_150/art/paintings/square/${painting.imageFileName.toString().padStart(6, '0')}.jpg`
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

  // Fetch artists from Supabase
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

  if (loading) return <div className="p-4 text-gray-100">Loading...</div>;

  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/galleries" element={<GalleryView galleries={galleries} paintings={paintings} artists={artists}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
