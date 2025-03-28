import { Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage.jsx';
import GalleryView from './components/GalleyView/GalleryView';
import ArtistView from './components/ArtistView/ArtistView';
import GenreView from './components/GenreView/GenreView';
import NotFound from './components/NotFound';
import NavBar from './components/NavBar';
import FooterBar from './components/FooterBar';

function AppRoutes({ galleries, paintings, artists, genres, paintinggenres, eras, favourites, setFavourites }) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {!isLoginPage && <NavBar favourites={favourites} setFavourites={setFavourites} />}

      <div className="flex-grow overflow-hidden flex flex-col">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/galleries"
            element={<GalleryView galleries={galleries} paintings={paintings} artists={artists} favourites={favourites} setFavourites={setFavourites} />}
          />
          <Route
            path="/artists"
            element={<ArtistView artists={artists} paintings={paintings} favourites={favourites} setFavourites={setFavourites} />}
          />
          <Route
            path="/genres"
            element={<GenreView genres={genres} paintings={paintings} artists={artists} paintinggenres={paintinggenres} favourites={favourites} eras={eras} setFavourites={setFavourites} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      {!isLoginPage && <FooterBar />}
    </div>
  );
}

export default AppRoutes;