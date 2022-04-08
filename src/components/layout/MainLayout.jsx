import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import ChatRoom from '../../components/chat/ChatRoom';
import Footer from '../footer/Footer'
import { Navbar } from '../ui/navbar/Navbar';
import { Context } from '../../context/Context';

export function MainLayout() {
  const [showChat, setShowChat] = useState(false);
  const [balance, setBalance] = useState('-');
  const [discordId, setDiscordId] = useState('-');

  return (
    <Context.Provider value={{ balance, setBalance, discordId, setDiscordId }}>
      <header>
        <Navbar navType="rps" />
      </header>
      <main className="wrapper-main">
        <section>
          <div className={`chat-section ${showChat ? 'expanded' : ''}`}>
            <ChatRoom />
          </div>

          <div className="chat_expand">
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