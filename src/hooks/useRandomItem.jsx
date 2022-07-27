import { useState, useEffect } from "react";

export const useRandomItem = ({ playing }) => {
  const [randomItem, setRandomItem] = useState("");

  useEffect(() => {
    const arrayOptions = ["a", "b", "c", "d", "e", "f"];
    const randomArray = (Math.random() * arrayOptions.length) | 0;
    const result = arrayOptions[randomArray];
    setRandomItem(result);
  }, [playing]);

  return { randomItem };
};
