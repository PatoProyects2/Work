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
    <div className={`wrapper ${theme}`}>
      <header>
        <Navbar theme={theme} setTheme={setTheme} />
      </header>
      <main className='container pt-3'>
        <section className="text-center">          
          <Outlet context={[theme]} />
        </section>
        <aside>

        </aside>
        <div className={`social-icons d-flex flex-row justify-content-center py-4 ${theme}`}>          
          <a href="https://www.google.com" className="twitter-icon me-2" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-2x fa-twitter"></i>
          </a>
          <a href="https://www.google.com" className="discord-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-2x fa-discord"></i>
          </a>
        </div>
      </main>
      <footer>
        <Footer theme={theme} />
      </footer>
    </div>

  );
}