import React from 'react'
import { Link, Outlet } from 'react-router-dom'

import ConnectWallet from '../Buttons/ConnectWallet'
import ConnectChain from '../Buttons/ConnectChain'
import Footer from '../Footer/Footer'

export function Layout() {
  return (
    <>
      <header>

      </header>
      <nav>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/marketplace">Marketplace</Link>
        <ConnectChain />
        <ConnectWallet />
      </nav>
      <main>
        <section>
          <Outlet />
        </section>
        <aside>

        </aside>
      </main>
      <footer>
        <Footer />
      </footer>
    </>

  );
}