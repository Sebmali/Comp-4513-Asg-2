import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { supabase } from './Supabase/supabaseClient'
import LoginPage from "./LoginPage.jsx"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import GalleryView from './components/GalleyView/GalleryView'

function App() {
  const [galleries, setGalleries] = useState([]);
  const [paintings, setPaintings] = useState([]);
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
        setPaintings(data);
      } catch (error) {
        console.error('Error fetching paintings: ', error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPaintings();
  }, []);

  if (loading) return <div className="p-4 text-gray-100">Loading...</div>;

  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GalleryView galleries={galleries} paintings={paintings}/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
