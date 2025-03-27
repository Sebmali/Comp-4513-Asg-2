import React, { useState, useEffect } from "react";
import NavBar from "../NavBar";           // Adjust path if needed
import FooterBar from "../FooterBar";     // Adjust path if needed
import PaintingsList from "../GalleyView/PaintingList"; // Reuse your existing component

//
// Left Column: List of Genres
//
function GenreList({ genres, onSelectGenre, selectedGenreId }) {
  // Sort genres by name
  const sortedGenres = [...genres].sort((a, b) =>
    a.genreName.localeCompare(b.genreName)
  );

  return (
    <aside className="flex flex-col h-full border border-gray-500 bg-gradient-to-br from-gray-700 to-gray-800 p-4 rounded-xl shadow-lg overflow-hidden">
      <h2 className="text-3xl font-bold mb-4 text-white tracking-wide">Genres</h2>
      <div className="flex-grow overflow-y-auto px-2 pb-4 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-700">
        <ul className="space-y-3">
          {sortedGenres.map((genre) => (
            <li key={genre.genreId}>
              <button
                type="button"
                onClick={() => onSelectGenre(genre.genreId)}
                className={`block w-full text-left px-4 py-3
                  bg-gray-600/80 hover:bg-indigo-600 hover:text-white
                  rounded-lg shadow-md transform transition duration-200
                  hover:scale-[1.03] active:scale-[0.98] focus:ring-2
                  focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-800
                  ${selectedGenreId === genre.genreId ? "bg-indigo-600" : ""}`}
              >
                {genre.genreName}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

//
// Middle Column: Genre Details
//
function GenreDetails({ selectedGenre, onAddToFavorites }) {
  if (!selectedGenre) {
    return (
      <section className="flex items-center justify-center h-full bg-gradient-to-br from-gray-700 to-gray-800 text-gray-300 rounded-xl shadow-lg">
        <p className="text-xl">Select a genre to view details</p>
      </section>
    );
  }

  // Destructure properties (adjust names to match your DB)
  const {
    genreId,
    genreName,
    era,
    description,
    genreLink,
  } = selectedGenre;

  return (
    <section className="p-6 flex flex-col gap-6 h-full overflow-auto bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl shadow-lg">
      <header className="pb-3 border-b border-gray-600">
        <h2 className="text-4xl font-bold text-white tracking-wide">
          {genreName}
        </h2>
      </header>

      <div className="grid grid-cols-1 gap-5">
        {/* Era */}
        <div className="p-4 bg-gray-600/70 rounded-lg shadow-md">
          <h4 className="text-xs uppercase tracking-widest text-gray-400">
            Era
          </h4>
          <p className="text-lg font-semibold text-gray-200 mt-1">
            {era || "N/A"}
          </p>
        </div>

        {/* Description */}
        <div className="p-4 bg-gray-600/70 rounded-lg shadow-md">
          <h4 className="text-xs uppercase tracking-widest text-gray-400">
            Description
          </h4>
          <p className="text-lg font-semibold text-gray-200 mt-1">
            {description || "No description available."}
          </p>
        </div>

        {/* Genre Link */}
        {genreLink && (
          <div className="p-4 bg-gray-600/70 rounded-lg shadow-md">
            <h4 className="text-xs uppercase tracking-widest text-gray-400">
              More Info
            </h4>
            <a
              href={genreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-indigo-300 hover:text-indigo-400 hover:underline break-words mt-1 inline-block"
            >
              {genreLink}
            </a>
          </div>
        )}
      </div>

      {/* Favorites Button */}
      <button
        type="button"
        onClick={() => onAddToFavorites(genreId)}
        className="w-max px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow-md transition duration-200 transform hover:scale-105 active:scale-95"
      >
        ❤️ Add to Favorites
      </button>
    </section>
  );
}

//
// Main Component: GenreView
//
export default function GenreView({ genres, paintings, artists }) {
  const [selectedGenreId, setSelectedGenreId] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // On selecting a genre, find its details
  useEffect(() => {
    if (selectedGenreId) {
      const found = genres.find((g) => g.genreId === selectedGenreId);
      setSelectedGenre(found);
    } else {
      setSelectedGenre(null);
    }
  }, [selectedGenreId, genres]);

  // Filter paintings by selected genre
  // If your data has a many-to-many relationship, you'll need a different filter approach
  const filteredPaintings = selectedGenreId
    ? paintings.filter((p) => p.genreId === selectedGenreId)
    : [];

  // Handler: select a genre
  const handleSelectGenre = (id) => {
    setSelectedGenreId(id);
  };

  // Handler: add a genre to favorites
  const handleAddToFavorites = (genreId) => {
    if (!favorites.includes(genreId)) {
      setFavorites([...favorites, genreId]);
      alert("Genre added to favorites!");
    }
  };

  // Handler: user selects a painting
  const handleSelectPainting = (paintingId) => {
    // Replace with your modal logic if desired
    alert(`Painting ${paintingId} selected!`);
  };

  // If you want to do custom sorting beyond what PaintingsList offers,
  // you can handle it here and pass the sorted data to PaintingsList.
  const handleSortChange = (sortBy) => {
    // No-op if PaintingsList already handles sorting internally
  };

  return (
    <div className="bg-gray-800 text-gray-100 h-full flex flex-col">
      <NavBar />
      <main className="grid grid-cols-3 gap-4 flex-grow p-4 h-full overflow-hidden">
        <GenreList
          genres={genres}
          onSelectGenre={handleSelectGenre}
          selectedGenreId={selectedGenreId}
        />
        <GenreDetails
          selectedGenre={selectedGenre}
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
