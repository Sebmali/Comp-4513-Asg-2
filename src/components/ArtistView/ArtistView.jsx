import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";         // Adjust paths as needed
import FooterBar from "../FooterBar";   // Adjust paths as needed
import PaintingsList from "../GalleyView/PaintingList"; // Reuse your existing component

// Component: List of Artists (Left Column)
function ArtistList({ artists, onSelectArtist, selectedArtistId }) {
  // Sort artists by last name
  const sortedArtists = [...artists].sort((a, b) =>
    a.lastName.localeCompare(b.lastName)
  );

  return (
    <aside className="flex flex-col h-full border border-gray-500 bg-gradient-to-br from-gray-700 to-gray-800 p-4 rounded-xl shadow-lg overflow-hidden">
      <h2 className="text-3xl font-bold mb-4 text-white tracking-wide">Artists</h2>
      <div className="flex-grow overflow-y-auto px-2 pb-4 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
        <ul className="space-y-3">
          {sortedArtists.map((artist) => (
            <li key={artist.artistId}>
              <button
                type="button"
                onClick={() => onSelectArtist(artist.artistId)}
                className={`block w-full text-left px-4 py-3
                  bg-gray-600/80 hover:bg-indigo-600 hover:text-white
                  rounded-lg shadow-md transform transition duration-200
                  hover:scale-[1.03] active:scale-[0.98] focus:ring-2
                  focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-800
                  ${selectedArtistId === artist.artistId ? "bg-indigo-600" : ""}`}
              >
                {artist.lastName}, {artist.firstName}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

// Component: Artist Details (Middle Column)
function ArtistDetails({ selectedArtist, onAddToFavorites }) {
  if (!selectedArtist) {
    return (
      <section className="flex items-center justify-center h-full bg-gradient-to-br from-gray-700 to-gray-800 text-gray-300 rounded-xl shadow-lg">
        <p className="text-xl">Select an artist to view details</p>
      </section>
    );
  }

  // Destructure properties; adjust field names as needed
  const {
    artistId,
    firstName,
    lastName,
    nationality,
    yearOfBirth,
    yearOfDeath,
    artistImage,
    gender,
    details,
  } = selectedArtist;

  return (
    <section className="p-6 flex flex-col gap-6 h-full overflow-auto bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl shadow-lg">
      <header className="pb-3 border-b border-gray-600">
        <h2 className="text-4xl font-bold text-white tracking-wide">
          {firstName} {lastName}
        </h2>
      </header>

      <div className="grid grid-cols-1 gap-5">
        <div className="p-4 bg-gray-600/70 rounded-lg shadow-md">
          <h4 className="text-xs uppercase tracking-widest text-gray-400">Birth - Death</h4>
          <p className="text-lg font-semibold text-gray-200 mt-1">
            {yearOfBirth} - {yearOfDeath}
          </p>
        </div>
        <div className="p-4 bg-gray-600/70 rounded-lg shadow-md">
          <h4 className="text-xs uppercase tracking-widest text-gray-400">Nationality</h4>
          <p className="text-lg font-semibold text-gray-200 mt-1">
            {nationality || "N/A"}
          </p>
        </div>
        <div className="p-4 bg-gray-600/70 rounded-lg shadow-md">
          <h4 className="text-xs uppercase tracking-widest text-gray-400">Gender</h4>
          <p className="text-lg font-semibold text-gray-200 mt-1">
            {gender || "N/A"}
          </p>
        </div>
        <div className="p-4 bg-gray-600/70 rounded-lg shadow-md">
          <h4 className="text-xs uppercase tracking-widest text-gray-400">Details</h4>
          <p className="text-lg font-semibold text-gray-200 mt-1">
            {details || "No details available."}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onAddToFavorites(artistId)}
        className="w-max px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow-md transition duration-200 transform hover:scale-105 active:scale-95"
      >
        ❤️ Add to Favorites
      </button>

      <div className="h-[350px] w-full rounded-xl shadow-md overflow-hidden border-4 border-gray-600">
        {artistImage ? (
          <img
            src={artistImage}
            alt={`${firstName} ${lastName}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-gray-500 text-gray-200">
            No Image Available
          </div>
        )}
      </div>
    </section>
  );
}

// Main Component: ArtistView
export default function ArtistView({ artists, paintings }) {
  const [selectedArtistId, setSelectedArtistId] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [selectedPaintingId, setSelectedPaintingId] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // When the selected artist ID changes, update the selected artist details
  useEffect(() => {
    if (selectedArtistId) {
      const found = artists.find((a) => a.artistId === selectedArtistId);
      setSelectedArtist(found);
    } else {
      setSelectedArtist(null);
    }
  }, [selectedArtistId, artists]);

  // Handler for selecting an artist
  const handleSelectArtist = (id) => {
    setSelectedArtistId(id);
  };

  // Filter paintings to those by the selected artist
  const filteredPaintings = selectedArtistId
    ? paintings.filter((p) => p.artistId === selectedArtistId)
    : [];

  // Handler for adding an artist to favorites
  const handleAddToFavorites = (artistId) => {
    if (!favorites.includes(artistId)) {
      setFavorites([...favorites, artistId]);
      alert("Artist added to favorites!");
    }
  };

  // Handler for selecting a painting (to display a modal, etc.)
  const handleSelectPainting = (paintingId) => {
    setSelectedPaintingId(paintingId);
    // Replace this alert with your modal dialog logic for painting details.
    alert(`Painting ${paintingId} selected`);
  };

  // Optionally, handle sort change if needed (your PaintingsList supports sorting already)
  const handleSortChange = (sortBy) => {
    // For further customization if needed.
  };

  return (
    <div className="bg-gray-800 text-gray-100 h-full flex flex-col">
      <NavBar />
      <main className="grid grid-cols-3 gap-4 flex-grow p-4 h-full overflow-hidden">
        <ArtistList
          artists={artists}
          onSelectArtist={handleSelectArtist}
          selectedArtistId={selectedArtistId}
        />
        <ArtistDetails
          selectedArtist={selectedArtist}
          onAddToFavorites={handleAddToFavorites}
        />
        <PaintingsList
          paintings={filteredPaintings}
          artists={artists}
          onSelectPainting={handleSelectPainting}
          onSortChange={handleSortChange}
        />
      </main>
      <FooterBar />
    </div>
  );
}
