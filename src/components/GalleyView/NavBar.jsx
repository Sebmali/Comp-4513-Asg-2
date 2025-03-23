import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiMenu } from 'react-icons/fi';

function NavBar () {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsMenuOpen(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSearchOpen(false);
  };

  return (
    <header className="flex items-center justify-between p-4 border-b shadow-sm relative bg-gray-800"> 
      {/* Left side: Logo (image) linking to home */}
      <div>
        <Link to="/" className="flex items-center">
          <img
            src="./src/assets/artisphere-logo.png"
            alt="Artisphere Logo"
            className="max-h-10 w-auto"
          />
          {/* <span className="ml-2 font-bold text-xl">Artisphere</span> */}
          <h1 className="m1-2 text-4x1] font-extrabold leading-tight tracking-wide uppercase text-bg-white p-4">Artisphere</h1>
        </Link>
      </div>

      {/* Right side: Search icon + Hamburger menu */}
      <div className="flex items-center space-x-4">
        {/* Search Icon */}
        <button
          onClick={handleSearchToggle}
          className="p-2 hover:bg-gray-200 rounded-full"
          aria-label="Search"
        >
          <FiSearch size={20} />
        </button>

        {/* Hamburger Menu Icon */}
        <button
          onClick={handleMenuToggle}
          className="p-2 hover:bg-gray-200 rounded-full"
          aria-label="Menu"
        >
          <FiMenu size={20} />
        </button>
      </div>

      {/* SEARCH DROPDOWN */}
      {isSearchOpen && (
        <div className="absolute top-full right-4 mt-2 bg-white border shadow-md p-2 z-10">
          <input
            type="text"
            placeholder="Search..."
            className="border p-2 focus:outline-none"
            // Optionally handle the search logic here or via a form submit
          />
        </div>
      )}

      {/* NAV MENU DROPDOWN */}
      {isMenuOpen && (
        <div className="absolute top-full right-4 mt-2 bg-white border shadow-md p-2 z-10">
          <ul className="flex flex-col space-y-2">
            <li>
              <Link
                to="/artists"
                className="hover:text-blue-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Artists
              </Link>
            </li>
            <li>
              <Link
                to="/paintings"
                className="hover:text-blue-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Paintings
              </Link>
            </li>
            <li>
              <Link
                to="/galleries"
                className="hover:text-blue-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Galleries
              </Link>
            </li>
            <li>
              <Link
                to="/genres"
                className="hover:text-blue-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Genres
              </Link>
            </li>
            <li>
              <Link
                to="/favorites"
                className="hover:text-blue-500"
                onClick={() => setIsMenuOpen(false)}
              >
                Favorites
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-blue-500"
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