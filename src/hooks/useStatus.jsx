import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export const useStatus = () => {
  const [load, setLoad] = useState(false);
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (token === null) {
      toast("Log in if you want to save your game stats and achievements", {
        duration: 10000,
        position: "top-right",
        style: {},
        className: "pop-up toast-modal",
        icon: <i className="fa-solid fa-circle-info text-primary"></i>,
        // Change colors of success/error/loading icon
        iconTheme: {
          primary: "#000",
          secondary: "#fff",
        },
        ariaProps: {
          role: "status",
          "aria-live": "polite",
        },
      });
    }
    setLoad(true);
  }, [token]);

  return { load };
};
