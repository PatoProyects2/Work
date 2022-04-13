import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import ChatRoom from '../chat/ChatRoom';
import Footer from '../footer/Footer'
import { NavbarDesktop } from '../ui/navbar/NavbarDesktop';
import { Context } from '../../context/Context';
export function GlobalLayout() {
  const [showChat, setShowChat] = useState(false);
  const [balance, setBalance] = useState('');
  const [discordId, setDiscordId] = useState('');
  const [unixTime, setUnixTime] = useState(Math.round((new Date()).getTime() / 1000));
  return (
    <Context.Provider value={{ balance, setBalance, discordId, setDiscordId, unixTime, setUnixTime }}>
      <header>
        <NavbarDesktop />
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