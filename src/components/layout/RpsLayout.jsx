import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase/firesbaseConfig'
import SignIn, { SignOut } from './Authentication';
import Footer from '../footer/Footer'
import { RpsMenu } from '../ui/menu/RpsMenu'

const currentTheme = () => {
  return localStorage.getItem("theme") || "light";
}

export function RpsLayout() {
  const [user] = useAuthState(auth)
  const [theme, setTheme] = useState(currentTheme());

  useEffect(() => {
    if (!theme) return;
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={`wrapper ${theme}`}>
      {user ?
        <>
          <SignOut />
          <main className='pt-3'>
            <section className="text-center">
              <Outlet context={[theme, setTheme]} />
            </section>
          </main>

          <RpsMenu theme={theme} />
          {/* <footer>
        <Footer theme={theme} setTheme={setTheme} />
      </footer> */}
        </>
        :
        <>
          <h2>Please Log In</h2>
          <SignIn />
        </>
      }
    </div>

  );
}