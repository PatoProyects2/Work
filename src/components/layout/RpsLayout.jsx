import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Context } from '../../context/Context';
import { NavbarDesktop } from '../ui/navbar/NavbarDesktop';
export function RpsLayout() {
  const [balance, setBalance] = useState('');
  const [discordId, setDiscordId] = useState('');

  return (
    <Context.Provider value={{ balance, setBalance, discordId, setDiscordId }}>
      <header>
        <NavbarDesktop />
      </header>
      <main className='wrapper'>
        <section>
          <Outlet />
        </section>
      </main>
    </Context.Provider>
  );
}