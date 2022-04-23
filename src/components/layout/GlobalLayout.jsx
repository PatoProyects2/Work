import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import ChatRoom from '../chat/ChatRoom';
import Footer from '../footer/Footer'
import { Toaster, ToastBar, toast } from 'react-hot-toast';
import { NavbarDesktop } from '../ui/navbar/NavbarDesktop';
import { Context } from '../../context/Context';
import { useMatchMedia } from '../../hooks/useMatchMedia'
export function GlobalLayout() {
  const [showChat, setShowChat] = useState(false);
  const [balance, setBalance] = useState('');
  const [discordId, setDiscordId] = useState('');
  const [soundToggle, setSoundToggle] = useState(true);
  const isMobileResolution = useMatchMedia('(max-width:650px)', false);
  return (
    <Context.Provider value={{ balance, setBalance, discordId, setDiscordId, soundToggle, setSoundToggle }}>
      <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          className='toast-modal'
          toastOptions={{
            // Define default options
            className: 'mt-5',
            duration: 5000,
            style: {
              background: 'rgba(28, 31, 35, 1)',
              color: 'whitesmoke'
            },
            // Default options for specific types
            success: {
              duration: 5000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}
        >

          {(t) => (
            <ToastBar toast={t}>
              {({ icon, message }) => (
                <>
                  {icon}
                  {message}
                  {isMobileResolution &&
                    <>
                      {t.type !== 'loading' && (
                        <span className='toast-close' onClick={() => toast.dismiss(t.id)}><i className='fa-solid fa-xmark fa-lg'></i></span>
                      )}
                    </>
                  }
                </>
              )}
            </ToastBar>
          )}
        </Toaster>
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
      <footer className={`${showChat ? 'footer-expanded' : ''}`}>
        <Footer />
      </footer>
    </Context.Provider>
  );
}