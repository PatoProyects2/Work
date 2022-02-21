import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/firesbaseConfig'
import SignIn, { SignOut } from './Authentication';
import Footer from '../footer/Footer'
import { MainMenu } from '../ui/menu/MainMenu'

const currentTheme = () => {
  return localStorage.getItem("theme") || "light";
}

export function MainLayout() {
  const [user] = useAuthState(auth)
  const [theme, setTheme] = useState(currentTheme());

  useEffect(() => {
    if (!theme) return;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={`wrapper ${theme}`}>
      <header>
        <a href="/">LOGO CLUB GAMES</a>
        {user ? <SignOut /> : <SignIn />}
      </header>
      <main className='pt-3'>
        <section className="text-center">
          <Outlet context={[theme, setTheme]} />
        </section>
      </main>
      <MainMenu theme={theme} />
      <footer>
        <Footer theme={theme} setTheme={setTheme} />
      </footer>
    </div>
  );
}