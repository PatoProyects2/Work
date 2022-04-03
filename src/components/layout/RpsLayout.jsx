import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import {Context} from '../../context/Context';
import { Navbar } from '../ui/navbar/Navbar';

export function RpsLayout() {

  const [balance, setBalance] = useState('-');

  return (
    <Context.Provider value={{balance, setBalance}}>
      <header>
        <Navbar navType="rps" />
      </header>
      <main className='wrapper'>
        <section>
          <Outlet />
        </section>
      </main>
    </Context.Provider>
  );
}