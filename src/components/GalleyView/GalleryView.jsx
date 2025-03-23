import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import GalleryList from './GalleryList';
import GalleryDetails from './GalleryDetails';

function GalleryView() {
  const [galleries, setGalleries] = useState([]);
  const [selectedGalleryId, setSelectedGalleryId] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [paintings, setPaintings] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Fetch galleries from Supabase on mount
  useEffect(() => {
    // Example fetch:
    // supabase.from('galleries').select('*').then(({ data, error }) => {
    //   if (!error) setGalleries(data);
    // });
    // For now, just hard-code:
    setGalleries([
      { id: 1, name: 'Gallery One', nativeName: 'Galleria Uno', city: 'City1', address: '123 Main St', country: 'Country1', website: 'https://example1.org', lat: 40.7128, lng: -74.0060 },
      { id: 2, name: 'Gallery Two', nativeName: 'Galleria Due', city: 'City2', address: '456 Side St', country: 'Country2', website: 'https://example2.org', lat: 34.0522, lng: -118.2437 }
    ]);
  }, []);

  // Fetch paintings for selected gallery
  useEffect(() => {
    if (selectedGalleryId) {
      // Example fetch from Supabase:
      // supabase.from('paintings').select('*').eq('gallery_id', selectedGalleryId).then(({ data, error }) => {
      //   if (!error) setPaintings(data);
      // });
      // Hard-coded for demonstration:
      setPaintings([
        { id: 101, artist: 'Artist 1', title: 'Painting 1', year: 2020, thumbnail: '/path/to/thumb1.jpg' },
        { id: 102, artist: 'Artist 2', title: 'Painting 2', year: 2021, thumbnail: '/path/to/thumb2.jpg' }
      ]);

      // Set selected gallery info
      const gallery = galleries.find(g => g.id === selectedGalleryId);
      setSelectedGallery(gallery);
    }
  }, [selectedGalleryId, galleries]);

  const handleSelectGallery = (id) => {
    setSelectedGalleryId(id);
  };

  const handleAddToFavorites = (galleryId) => {
    // Add logic to store in Supabase or local state
    if (!favorites.includes(galleryId)) {
      setFavorites([...favorites, galleryId]);
    }
  };

  const handleSortChange = (sortBy) => {
    // Implement your sorting logic for paintings
    const sortedPaintings = [...paintings].sort((a, b) => {
      if (sortBy === 'artist') return a.artist.localeCompare(b.artist);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'year') return a.year - b.year;
      return 0;
    });
    setPaintings(sortedPaintings);
  };

  const handleSelectPainting = (paintingId) => {
    // Possibly navigate to a painting details page or show a modal
    console.log('Selected painting:', paintingId);
  };

  return (
    <div className="bg-gray-800 text-gray-100 min-h-screen flex flex-col">
      <NavBar />
      <main className="grid grid-cols-3 gap-4 flex-grow p-4">
        <GalleryList galleries={galleries} onSelectGallery={handleSelectGallery} />
        <GalleryDetails selectedGallery={selectedGallery} onAddToFavorites={handleAddToFavorites} />
      </main>
    </div>
  );
}

export default GalleryView;