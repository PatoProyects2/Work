import { useState } from "react";
import { toast, ToastBar, Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { Context } from "../../context/Context";
import { useMatchMedia } from "../../hooks/useMatchMedia";
import ChatRoom from "../Chat/ChatRoom";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import SocialButtons from "../../components/SocialButtons/SocialButtons";

const MainLayout = () => {
  const [balance, setBalance] = useState("");
  const [discordId, setDiscordId] = useState("");
  const [chatHistory, setChatHistory] = useState(50);
  const [soundToggle, setSoundToggle] = useState(true);
  const [gas, setGas] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const isMobileResolution = useMatchMedia("(max-width:650px)", false);

  return (
    <Context.Provider
      value={{
        balance,
        setBalance,
        discordId,
        setDiscordId,
        soundToggle,
        setSoundToggle,
        chatHistory,
        setChatHistory,
        gas,
        setGas,
      }}
    >
      <div className="div-test">
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          className="toast-modal"
          toastOptions={{
            // Define default options
            className: "toast-settings",
            duration: 5000,
            style: {
              background: "rgba(28, 31, 35, 1)",
              color: "whitesmoke",
            },
            // Default options for specific types
            success: {
              duration: 5000,
              theme: {
                primary: "green",
                secondary: "black",
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
                  {isMobileResolution && (
                    <>
                      {t.type !== "loading" && (
                        <span
                          className="toast-close"
                          onClick={() => toast.dismiss(t.id)}
                        >
                          <i className="fa-solid fa-xmark fa-lg"></i>
                        </span>
                      )}
                    </>
                  )}
                </>
              )}
            </ToastBar>
          )}
        </Toaster>
      </div>
      <header>
        <NavBar />
      </header>
      <main className="wrapper-main">
        <section>
          <div className={`chat-section ${showChat ? "expanded" : ""}`}>
            <ChatRoom showChat={showChat} />
          </div>
          <div className="chat_expand">
            <span
              className={`chat_collapse_ico ${showChat ? "expanded" : ""}`}
              onClick={() => setShowChat(!showChat)}
            ></span>
          </div>
          <SocialButtons />
          <div className={`content-section ${showChat ? "expanded" : ""}`}>
            <Outlet />
          </div>
        </section>
      </main>
      <footer className={`${showChat ? "footer-expanded" : ""}`}>
        <Footer />
      </footer>
    </Context.Provider>
  );
};

export default MainLayout;
