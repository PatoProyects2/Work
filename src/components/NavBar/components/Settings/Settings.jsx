import { useContext, useEffect } from "react";
import { Context } from "../../../../context/Context";
import { useGas } from "../../../../hooks/useGas";

const Settings = () => {
  const {
    soundToggle,
    setSoundToggle,
    chatHistory,
    setChatHistory,
    gas,
    setGas,
  } = useContext(Context);
  const gasTrack = useGas();

  useEffect(() => {
    if (!gas && gasTrack) {
      setGas({ state: "instant", value: parseInt(gasTrack.fast.maxFee) });
    }
  }, [gas, gasTrack]);

  useEffect(() => {
    let open = document.querySelectorAll(".open-modal")[0];
    let close = document.querySelectorAll(".close")[0];
    let container = document.querySelectorAll(".container-modal")[0];
    let modal = document.querySelectorAll(".modal")[0];
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
        style={{ color: "#ffdb5b" }}
        aria-hidden="true"
      ></i>

      <div className="container-modal">
        <div className="modal modal-close">
          <div className="modal-flex">
            <h4 className="text-settings">Settings</h4>
            <span className="close" aria-label="Close">
              <i className="fa fa-times" aria-hidden="true"></i>
            </span>
          </div>
          <span className="text-white">Sound</span>
          <div className="settings-div">
            <button
              className={soundToggle ? "green" : "setting-button"}
              onClick={() => !soundToggle && setSoundToggle(true)}
            >
              <i className="fas fa-volume-up"></i>
            </button>
            <button
              className={!soundToggle ? "red" : "setting-button"}
              onClick={() => soundToggle && setSoundToggle(false)}
            >
              <i className="fas fa-volume-mute"></i>
            </button>
          </div>
          <span className="d-block text-white">Transaction speed (GWEI)</span>
          <div className="settings-div text-center">
            {gasTrack && (
              <div>
                <button
                  className={
                    gas.state === "standard" ? "green" : "setting-button"
                  }
                  onClick={() =>
                    gas.state !== "standard" &&
                    setGas({
                      state: "standard",
                      value: parseInt(gasTrack.safeLow.maxFee),
                    })
                  }
                >
                  Standard
                  {/* ({gasTrack.safeLow.maxFee.toFixed(2)}) */}
                </button>
                <button
                  className={gas.state === "fast" ? "green" : "setting-button"}
                  onClick={() =>
                    gas.state !== "fast" &&
                    setGas({
                      state: "fast",
                      value: parseInt(gasTrack.standard.maxFee),
                    })
                  }
                >
                  Fast
                  {/* ({gasTrack.standard.maxFee.toFixed(2)}) */}
                </button>
                <button
                  className={
                    gas.state === "instant" ? "green" : "setting-button"
                  }
                  onClick={() =>
                    gas.state !== "instant" &&
                    setGas({
                      state: "instant",
                      value: parseInt(gasTrack.fast.maxFee),
                    })
                  }
                >
                  Instant
                  {/* ({gasTrack.fast.maxFee.toFixed(2)}) */}
                </button>
              </div>
            )}
          </div>
          <span className="d-block text-white">Message History</span>
          <div className="text-center settings-div">
            <div>
              <button
                className={chatHistory === 50 ? "green" : "setting-button"}
                onClick={() => chatHistory !== 50 && setChatHistory(50)}
              >
                50
              </button>
              <button
                className={chatHistory === 100 ? "green" : "setting-button"}
                onClick={() => chatHistory !== 100 && setChatHistory(100)}
              >
                100
              </button>
              <button
                className={chatHistory === 300 ? "green" : "setting-button"}
                onClick={() => chatHistory !== 300 && setChatHistory(300)}
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
