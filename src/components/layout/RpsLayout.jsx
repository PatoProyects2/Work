import React from 'react'
import { Outlet } from 'react-router-dom'

// import { RpsMenu } from '../ui/menu/RpsMenu'
import { Navbar } from '../ui/navbar/Navbar';

export function RpsLayout() {

  return (
    <>
      <header>
        <Navbar navType="rps" />
      </header>
      <main className='wrapper'>
        <section className="text-center">
            <Outlet />
        </section>
        {/* <RpsMenu /> */}
      </main>
    </>
  );
}