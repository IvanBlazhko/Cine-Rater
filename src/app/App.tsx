import React, { lazy, Suspense } from 'react';

import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Loader from '../components/loader/loader';

import '../styles/style.scss';
import 'react-toastify/dist/ReactToastify.css';

const Home = lazy(() => import('../pages/home'));
const MoviesPage = lazy(() => import('../pages/movies'));
const PopularPage = lazy(() => import('../pages/popular/popularPage'));
const PremierePage = lazy(() => import('../pages/premiere'));
const Saved = lazy(() => import('../pages/saved'));
const Trailer = lazy(() => import('../pages/trailer'));
const NotFound = lazy(() => import('../pages/notFound'));
const MovieItem = lazy(() => import('../components/movie'));
const Layout = lazy(() => import('../components/layout'));

const App: React.FC = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="movies" element={<MoviesPage />} />
            <Route path="popular" element={<PopularPage />} />
            <Route path="premiere" element={<PremierePage />} />
            <Route path="saved" element={<Saved />} />
            <Route path="trailer/:img/:id/:title" element={<Trailer />} />
            <Route path="movie/:id" element={<MovieItem />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer />
    </>
  );
};

export default App;
