import React, {useState} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firesbaseConfig'
import { Outlet } from 'react-router-dom'
import ChatRoom from '../../views/main/components/chat/ChatRoom';
import Footer from '../footer/Footer'
import { Navbar } from '../ui/navbar/Navbar';
import { useMatchMedia } from '../../hooks/useMatchMedia';

export function MainLayout() {
  const [user] = useAuthState(auth);
  const [showChat, setShowChat] = useState(false);
  const isMobileResolution = useMatchMedia('(max-width:480px)', false);

  return (
    <>
      <header>
        <Navbar navType="main" />
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
    </>
  );
}