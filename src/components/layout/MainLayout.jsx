import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firesbaseConfig'
import { Outlet } from 'react-router-dom'
import ChatRoom from '../../views/main/components/chat/ChatRoom';
import Footer from '../footer/Footer'
import { Navbar } from '../ui/navbar/Navbar';
import { Context } from '../../context/Context';

export function MainLayout() {
  const [user] = useAuthState(auth);
  const [showChat, setShowChat] = useState(false);
  const [balance, setBalance] = useState('-');

  return (
    <Context.Provider value={{ balance, setBalance}}>
      <header>
        <Navbar navType="rps" />
      </header>
      <main className="wrapper-main">
        <section>
          <div className={`chat-section ${showChat ? 'expanded' : ''}`}>
            <ChatRoom user={user} />
          </div>

          <div className="chat_floating_btn_wrapper chat_expand">
            <span className={`chat_collapse_ico ${showChat ? 'expanded' : ''}`} onClick={() => setShowChat(!showChat)}></span>
          </div>

          <div className={`content-section ${showChat ? 'expanded' : ''}`}>
            <Outlet />
          </div>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </Context.Provider>
  );
}