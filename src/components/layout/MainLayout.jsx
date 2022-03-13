import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from '../../firebase/firesbaseConfig'
import { Outlet } from 'react-router-dom'
import ChatRoom from '../../views/main/components/chat/ChatRoom';
import Footer from '../footer/Footer'
import { Navbar } from '../ui/navbar/Navbar';

export function MainLayout() {
  const [user] = useAuthState(auth)

  return (
    <>
      <header>
        <Navbar navType="main" />
      </header>
      <main className="wrapper">
        <section>
          <div className="chat-section">
            <ChatRoom user={user} />
          </div>

          <div className="content-section">
            <Outlet />
          </div>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}