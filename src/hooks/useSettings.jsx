import { useState, useEffect } from "react";

export const useSettings = () => {
  const [sound, setSound] = useState("on");
  const [gas, setGas] = useState("instant");
  const [chat, setChat] = useState("50");

  const soundStorage = window.localStorage.getItem("sound");
  const gasStorage = window.localStorage.getItem("gas");
  const chatStorage = window.localStorage.getItem("chat");

  const ageStorage = window.localStorage.getItem("age");

  useEffect(() => {
    if (soundStorage === null && gasStorage === null && chatStorage === null) {
      window.localStorage.setItem("sound", "on");
      window.localStorage.setItem("gas", "instant");
      window.localStorage.setItem("chat", 50);
    } else {
      setSound(soundStorage);
      setGas(gasStorage);
      setChat(chatStorage);
    }
    if (ageStorage === null) {
      window.localStorage.setItem("age", false);
    }
  }, [soundStorage, gasStorage, chatStorage, ageStorage]);

  return { sound, setSound, gas, setGas, chat, setChat };
};
