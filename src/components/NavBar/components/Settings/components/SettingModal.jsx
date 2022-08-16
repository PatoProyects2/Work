import { useEffect } from "react";

export const Modal = ({ children }) => {
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
          {children}
        </div>
      </div>
    </>
  );
};

export const Group = ({ children, title }) => {
  return (
    <>
      <span className="subtitle-modal">{title}</span>
      <div className="settings-div">{children}</div>
    </>
  );
};

export const Button = ({ storage, setStorage, item, value, color, label }) => {
  return (
    <button
      className={
        storage === value ? `${color} setting-button` : "setting-button"
      }
      onClick={() => (
        window.localStorage.setItem(item, value),
        setStorage(window.localStorage.getItem(item))
      )}
      disabled={storage === value}
    >
      {label}
    </button>
  );
};
