import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import {BalanceContext} from '../../context/BalanceContext';

import { Navbar } from '../ui/navbar/Navbar';

export function RpsLayout() {

  const [balance, setBalance] = useState('-');

  return (
    <BalanceContext.Provider value={{balance, setBalance}}>
      <header>
        <Navbar navType="rps" />
      </header>
      <main className='wrapper'>
        <section className="text-center">
          <Outlet />
        </section>
      </main>
    </BalanceContext.Provider>
  );
}