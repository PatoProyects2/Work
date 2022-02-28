import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'
import { Navbar } from '../ui/navbar/Navbar';

export function MainLayout() {

  return (
    <>
      <header>        
        <Navbar navType="main" />
      </header>
      <main className="wrapper">
        <section>
          <Outlet />
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}