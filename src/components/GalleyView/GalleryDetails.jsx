// GalleryDetails.jsx

import React from 'react';
// If you're using React Leaflet, uncomment these imports:
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

function GalleryDetails({ selectedGallery, onAddToFavorites }) {
  // If no gallery is selected yet, display a simple message
  if (!selectedGallery) {
    return (
      <section className="border p-4">
        <h2 className="text-lg font-semibold mb-3">Gallery Information</h2>
        <p>Please select a gallery to view details.</p>
      </section>
    );
  }

  // Destructure gallery fields for easier usage
  const {
    GalleryName,
    GalleryNativeName,
    GalleryCity,
    GalleryAddress,
    GalleryCountry,
    GalleryWebSite,
    Latitude,
    Longitude,
    GalleryID
  } = selectedGallery;

  return (
    <section className="border p-4">
      <h2 className="text-lg font-semibold mb-3">Gallery Information</h2>
      <p><strong>Name:</strong> {GalleryName}</p>
      <p><strong>Native Name:</strong> {GalleryNativeName}</p>
      <p><strong>City:</strong> {GalleryCity}</p>
      <p><strong>Address:</strong> {GalleryAddress}</p>
      <p><strong>Country:</strong> {GalleryCountry}</p>
      <p>
        <strong>Website:</strong>{' '}
        {GalleryWebSite ? (
          <a
            href={GalleryWebSite}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {GalleryWebSite}
          </a>
        ) : (
          'N/A'
        )}
      </p>

      {/* Add to Favorites Button */}
      <button
        type="button"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => onAddToFavorites(GalleryID)}
      >
        Add to Favorites
      </button>

      {/* Example Map Section */}
      <div className="mt-6 h-64 w-full bg-gray-100 flex items-center justify-center text-gray-400">
        {/* If using React Leaflet, you could do something like:
        
        <MapContainer center={[Latitude, Longitude]} zoom={13} className="h-full w-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[Latitude, Longitude]}>
            <Popup>{GalleryName}</Popup>
          </Marker>
        </MapContainer>
        
        */}
        <span>Map Placeholder</span>
      </div>
    </section>
  );
}

export default GalleryDetails;