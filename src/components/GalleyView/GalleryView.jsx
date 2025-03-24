import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar';
import GalleryList from './GalleryList';
import GalleryDetails from './GalleryDetails';
import PaintingsList from './PaintingList';

function GalleryView({ galleries, paintings}) {
  const [selectedGalleryId, setSelectedGalleryId] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [selectedPaintingId, setSelectedPaintingId] = useState(null);
  const [favorites, setFavorites] = useState([]);

  console.log(paintings);

  useEffect(() => {
    if (selectedGalleryId) {
        const found = galleries.find(g => g.galleryId === selectedGalleryId);
        setSelectedGallery(found);
    } else {
        setSelectedGallery(null);
    }
  }, [selectedGalleryId, galleries]);

  const handleSelectGallery = (id) => {
    setSelectedGalleryId(id);
    console.log('Selected gallery:', id);
  };

  const filteredPaintings = selectedGalleryId 
    ? paintings.filter(p => p.galleryId === selectedGalleryId)
    : [];

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
    setSelectedPaintingId(paintingId);
    console.log('Selected painting:', paintingId);
  };

  return (
    <div className="bg-gray-800 text-gray-100 h-full flex flex-col">
      <NavBar />
      <main className="grid grid-cols-3 gap-4 flex-grow p-4 h-full overflow-hidden ">
        <GalleryList galleries={galleries} onSelectGallery={handleSelectGallery} />
        <GalleryDetails selectedGallery={selectedGallery} onAddToFavorites={handleAddToFavorites} />
        <PaintingsList paintings={filteredPaintings} onSelectPainting={handleSelectPainting} onSortChange={handleSortChange} />
      </main>
    </div>
  );
}

export default GalleryView;