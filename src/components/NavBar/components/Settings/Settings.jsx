import { useEffect } from "react";
import { useSettings } from "../../../../hooks/useSettings";
const Settings = () => {
  const { sound, setSound, gas, setGas, chat, setChat } = useSettings();

  useEffect(() => {
    let open = document.querySelectorAll(".open-modal")[0];
    let close = document.querySelectorAll(".close")[0];
    let container = document.querySelectorAll(".container-modal")[0];
    let modal = document.querySelectorAll(".modal-settings")[0];
    let body = document.querySelectorAll("body")[0];

    open.onclick = function (event) {
      event.preventDefault();

      container.style.opacity = "1";
      container.style.visibility = "visible";
      container.style.animation = "fadeIn 0.3s";

      modal.classList.toggle("modal-close");

      body.style.position = "static";
      body.style.height = "100%";
      body.style.overflow = "hidden";
    };

    close.onclick = function () {
      modal.classList.toggle("modal-close");
      container.style.animation = "fadeOut 0.3s";

      setTimeout(() => {
        container.style.opacity = "0";
        container.style.visibility = "hidden";

        body.style.position = "inherit";
        body.style.height = "auto";
        body.style.overflow = "visible";
      }, 200);
    };

    window.onclick = function (event) {
      if (event.target === container) {
        modal.classList.toggle("modal-close");
        container.style.animation = "fadeOut 0.3s";

        setTimeout(() => {
          container.style.opacity = "0";
          container.style.visibility = "hidden";

          body.style.position = "inherit";
          body.style.height = "auto";
          body.style.overflow = "visible";
        }, 200);
      }
    };
  }, []);

  return (
    <>
      <i
        role="button"
        className="open-modal fa fa-cog"
        style={{ color: "#ffe869" }}
        aria-hidden="true"
      ></i>

      <div className="container-modal">
        <div className="modal-settings modal-close">
          <div className="modal-flex">
            <h4 className="text-settings">Settings</h4>
            <span className="close" aria-label="Close">
              <i className="fa fa-times" aria-hidden="true"></i>
            </span>
          </div>

          <span className="subtitle-modal">Sound</span>
          <div className="settings-div">
            <button
              className={
                sound === "on" ? "green setting-button" : "setting-button"
              }
              onClick={() =>
                sound === "off" &&
                (window.localStorage.setItem("sound", "on"), setSound("on"))
              }
            >
              <i className="fas fa-volume-up"></i>
            </button>
            <button
              className={
                sound === "off" ? "red setting-button" : "setting-button"
              }
              onClick={() =>
                sound === "on" &&
                (window.localStorage.setItem("sound", "off"), setSound("off"))
              }
            >
              <i className="fas fa-volume-mute"></i>
            </button>
          </div>
          <span className="subtitle-modal">Transaction speed (GWEI)</span>
          <div className="settings-div text-center">
            <div>
              <button
                className={
                  gas === "standard" ? "green setting-button" : "setting-button"
                }
                onClick={() =>
                  gas !== "standard" &&
                  (window.localStorage.setItem("gas", "standard"),
                  setGas("standard"))
                }
              >
                Standard
              </button>
              <button
                className={
                  gas === "fast" ? "green setting-button" : "setting-button"
                }
                onClick={() =>
                  gas !== "fast" &&
                  (window.localStorage.setItem("gas", "fast"), setGas("fast"))
                }
              >
                Fast
              </button>
              <button
                className={
                  gas === "instant" ? "green setting-button" : "setting-button"
                }
                onClick={() =>
                  gas !== "instant" &&
                  (window.localStorage.setItem("gas", "instant"),
                  setGas("instant"))
                }
              >
                Instant
              </button>
            </div>
          </div>
          <span className="subtitle-modal">Message history</span>
          <div className="text-center settings-div">
            <div>
              <button
                className={
                  chat === "50" ? "green setting-button" : "setting-button"
                }
                onClick={() =>
                  chat !== "50" &&
                  (window.localStorage.setItem("chat", 50), setChat("50"))
                }
              >
                50
              </button>
              <button
                className={
                  chat === "100" ? "green setting-button" : "setting-button"
                }
                onClick={() =>
                  chat !== "100" &&
                  (window.localStorage.setItem("chat", 100), setChat("100"))
                }
              >
                100
              </button>
              <button
                className={
                  chat === "300" ? "green setting-button" : "setting-button"
                }
                onClick={() =>
                  chat !== "300" &&
                  (window.localStorage.setItem("chat", 300), setChat("300"))
                }
              >
                300
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
