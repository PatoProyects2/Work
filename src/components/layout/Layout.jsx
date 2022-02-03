import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'
import { Navbar } from '../ui/navbar/Navbar'

const currentTheme = () => {
  return localStorage.getItem("theme") || "light";
}

export function Layout() {

  const [theme, setTheme] = useState(currentTheme());

  useEffect(() => {
    if (!theme) return;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={theme}>
      <header>
        <Navbar theme={theme} setTheme={setTheme} />
      </header>
      <main className='container pt-3'>
        <section className="text-center">          
          <Outlet />
        </section>
        <aside>

        </aside>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>

  );
}