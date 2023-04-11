import React from 'react';

import { Outlet } from 'react-router-dom';

import Header from '../header/header';
import Footer from '../footer/footer';

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main className="main">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
