import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiMenu, FiHeart } from 'react-icons/fi';

function NavBar ({ favourites = []}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFavouritesOpen, setIsFavouritesOpen] = useState(false);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsMenuOpen(false);
    setIsFavouritesOpen(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSearchOpen(false);
    setIsFavouritesOpen(false);
  };

  const handleFavouritesToggle = () => {
    if (isFavouritesOpen.length > 0) {
      setIsFavouritesOpen(!isFavouritesOpen);
      setIsSearchOpen(false);
      setIsMenuOpen(false);
    }
  }

  return (
    <header className="flex items-center justify-between p-4 border-b shadow-sm relative bg-gray-800"> 
      {/* Left side: Logo (image) linking to home */}
      <div>
        <Link to="/" className="flex items-center">
          <img
            src="./src/assets/ArtisphereMinimalistic.png"
            alt="Artisphere Logo"
            className="h-auto w-45"
          />
          {/* <h1 className="m1-2 text-4x1] font-extrabold leading-tight tracking-wide uppercase text-bg-white p-4">Artisphere</h1> */}
        </Link>
      </div>

      {/* Right side: Search icon + Hamburger menu */}
      <div className="flex items-center space-x-4">
        {/* Favourites Icon */}
        <button
          onClick={handleFavouritesToggle}
          className={`block w-full text-left px-4 py-3
                  bg-gray-600/80 hover:bg-indigo-600 hover:text-white
                  rounded-lg shadow-md transform transition duration-200
                  hover:scale-[1.03] active:scale-[0.98] focus:ring-2
                  focus:ring-indigo-400 focus:ring-offset-2
                  focus:ring-offset-gray-800 ${
            favourites.length > 0 ? 'hover:bg-gray-200 cursor-pointer' : 'opacity-40 cursor-default'
          }`}
          aria-label="Favourites"
          disabled={favourites.length === 0}
        >
          <FiHeart size={20} />
        </button>
        
        {/* Search Icon */}
        <button
          onClick={handleSearchToggle}
          className="block w-full text-left px-4 py-3
                  bg-gray-600/80 hover:bg-indigo-600 hover:text-white
                  rounded-lg shadow-md transform transition duration-200
                  hover:scale-[1.03] active:scale-[0.98] focus:ring-2
                  focus:ring-indigo-400 focus:ring-offset-2
                  focus:ring-offset-gray-800"
          // className="p-2 hover:bg-gray-200 rounded-full"
          aria-label="Search"
        >
          <FiSearch size={20} />
        </button>

        {/* Hamburger Menu Icon */}
        <button
          onClick={handleMenuToggle}
          className="block w-full text-left px-4 py-3
                  bg-gray-600/80 hover:bg-indigo-600 hover:text-white
                  rounded-lg shadow-md transform transition duration-200
                  hover:scale-[1.03] active:scale-[0.98] focus:ring-2
                  focus:ring-indigo-400 focus:ring-offset-2
                  focus:ring-offset-gray-800"
          aria-label="Menu"
        >
          <FiMenu size={20} />
        </button>
      </div>

      {/* FAVOURITES DROPDOWN */}
      {isFavouritesOpen && (
        <div className="absolute top-full right-4 mt-2 w-64 bg-gray-800 border shadow-md p-2 z-10 rounded-md">
        <ul className="space-y-1">
          {favourites.map((item, index) => (
            <li key={index} className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md text-white">
              {item}
            </li>
          ))}
        </ul>
      </div>
    )}

      {/* SEARCH DROPDOWN */}
      {isSearchOpen && (
        <div className="absolute top-full right-4 mt-2 bg-gray-800 text-black border shadow-md p-2 z-10">
          <input
            type="text"
            placeholder="Search..."
            className="block w-full 
                        px-4 py-2
                        bg-gray-600
                        hover:bg-gray-500
                        rounded-md
                        focus:outline-none
                        focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-700
                        transition-colors duration-150 ease-in-out text-white"
          />
        </div>
      )}

      {/* NAV MENU DROPDOWN */}
      {isMenuOpen && (
        <div className="absolute top-full right-4 mt-2 bg-gray-800 text-black border shadow-md p-2 z-10">
          <ul className="flex flex-col space-y-2">
            <li>
              <Link
                to="/artists"
                className="block w-full text-left px-4 py-3
                  bg-gray-600/80 hover:bg-indigo-600
                  rounded-lg shadow-md transform transition duration-200
                  hover:scale-[1.03] active:scale-[0.98] focus:ring-2
                  focus:ring-indigo-400 focus:ring-offset-2
                  focus:ring-offset-gray-800 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Artists
              </Link>
            </li>
            <li>
              <Link
                to="/paintings"
                className="block w-full text-left px-4 py-3
                  bg-gray-600/80 hover:bg-indigo-600
                  rounded-lg shadow-md transform transition duration-200
                  hover:scale-[1.03] active:scale-[0.98] focus:ring-2
                  focus:ring-indigo-400 focus:ring-offset-2
                  focus:ring-offset-gray-800 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Paintings
              </Link>
            </li>
            <li>
              <Link
                to="/galleries"
                className="block w-full text-left px-4 py-3
                  bg-gray-600/80 hover:bg-indigo-600 
                  rounded-lg shadow-md transform transition duration-200
                  hover:scale-[1.03] active:scale-[0.98] focus:ring-2
                  focus:ring-indigo-400 focus:ring-offset-2
                  focus:ring-offset-gray-800 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Galleries
              </Link>
            </li>
            <li>
              <Link
                to="/genres"
                className="block w-full text-left px-4 py-3
                  bg-gray-600/80 hover:bg-indigo-600
                  rounded-lg shadow-md transform transition duration-200
                  hover:scale-[1.03] active:scale-[0.98] focus:ring-2
                  focus:ring-indigo-400 focus:ring-offset-2
                  focus:ring-offset-gray-800 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Genres
              </Link>
            </li>
            <li>
              <Link
                to="/favorites"
                className="block w-full text-left px-4 py-3
                  bg-gray-600/80 hover:bg-indigo-600
                  rounded-lg shadow-md transform transition duration-200
                  hover:scale-[1.03] active:scale-[0.98] focus:ring-2
                  focus:ring-indigo-400 focus:ring-offset-2
                  focus:ring-offset-gray-800 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Favorites
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block w-full text-left px-4 py-3
                  bg-gray-600/80 hover:bg-indigo-600
                  rounded-lg shadow-md transform transition duration-200
                  hover:scale-[1.03] active:scale-[0.98] focus:ring-2
                  focus:ring-indigo-400 focus:ring-offset-2
                  focus:ring-offset-gray-800 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default NavBar;