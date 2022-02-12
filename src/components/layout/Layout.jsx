import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'
import { Menu } from '../ui/menu/Menu'

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
      <main className='pt-3'>
        <section className="text-center">          
          <Outlet context={[theme, setTheme]} />
        </section>        
      </main>

      <Menu theme={theme} />
      <footer>
        <Footer theme={theme} setTheme={setTheme} />
      </footer>
    </div>

  );
}