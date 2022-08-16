import { useState, useMemo, useEffect } from "react";
import { toast, ToastBar, Toaster, useToasterStore } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import { Context } from "../../context/Context";
import { useMatchMedia } from "../../hooks/useMatchMedia";
import ChatRoom from "../Chat/ChatRoom";
import NavBar from "../NavBar/NavBar";
import SocialBar from "../../components/SocialBar/SocialBar";
import Spinner from "../Spinner/Spinner";

export default function MainLayout() {
  const [web3Data, setWeb3Data] = useState(false);
  const [balance, setBalance] = useState("");
  const [socket, setSocket] = useState(false);
  const [playerDocument, setPlayerDocument] = useState(false);

  return (
    <Context.Provider
      value={useMemo(
        () => ({
          web3Data,
          setWeb3Data,
          balance,
          setBalance,
          socket,
          setSocket,
          playerDocument,
          setPlayerDocument,
        }),
        [
          web3Data,
          setWeb3Data,
          balance,
          setBalance,
          socket,
          setSocket,
          playerDocument,
          setPlayerDocument,
        ]
      )}
    >
      <ToastModal />
      <header>
        <NavBar />
      </header>
      <main className="wrapper-main">
        <section>
          {web3Data && socket ? (
            <MainDom />
          ) : (
            <div className="content-section">
              <Spinner />
            </div>
          )}
        </section>
      </main>
    </Context.Provider>
  );
}

function MainDom() {
  useEffect(() => {
    let openChat = document.querySelectorAll(".chat_collapse_ico")[0];
    let chat = document.querySelectorAll(".chat-section")[0];
    let messages = document.querySelectorAll(".chat_msgs")[0];
    let title = document.querySelectorAll(".background-messages")[0];
    let social = document.querySelectorAll(".social-section")[0];
    let content = document.querySelectorAll(".content-section")[0];

    if (openChat && chat && messages && social && content) {
      openChat.classList.add("expanded");
      content.classList.add("expanded");
      social.classList.add("expanded");
      chat.classList.add("expanded");
      messages.style.visibility = "visible";
      title.style.visibility = "visible";

      openChat.onclick = function (event) {
        event.preventDefault();
        if (
          openChat.classList.contains("expanded") &&
          chat.classList.contains("expanded") &&
          social.classList.contains("expanded") &&
          content.classList.contains("expanded")
        ) {
          openChat.classList.remove("expanded");
          content.classList.remove("expanded");
          social.classList.remove("expanded");
          chat.classList.remove("expanded");
          messages.style.visibility = "hidden";
          title.style.visibility = "hidden";
        } else {
          openChat.classList.add("expanded");
          content.classList.add("expanded");
          social.classList.add("expanded");
          chat.classList.add("expanded");
          setTimeout(() => {
            messages.style.visibility = "visible";
            title.style.visibility = "visible";
          }, 300);
        }
      };
    }
  }, []);

  return (
    <>
      <div className="chat-section">
        <ChatRoom />
      </div>
      <div className="chat_expand">
        <span className="chat_collapse_ico"></span>
      </div>
      <div className="social-section">
        <SocialBar />
      </div>
      <div className="content-section">
        <Outlet />
      </div>
    </>
  );
}

function ToastModal() {
  const isMobileResolution = useMatchMedia("(max-width:650px)", false);

  const { toasts } = useToasterStore();

  const TOAST_LIMIT = 1;

  useEffect(() => {
    toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT) // Is toast index over limit?
      .forEach((t) => toast.dismiss(t.id)); // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  return (
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
  );
}
