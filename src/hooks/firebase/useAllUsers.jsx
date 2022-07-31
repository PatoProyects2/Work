import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firesbaseConfig";

export const useAllUsers = () => {
  const [allUsers, setAllUsers] = useState(false);

  useEffect(() => {
    console.log("Reading useAllUsers");
    const time = Math.round(new Date().getTime() / 1000);
    const lastDay = time - 86400;
    const q = query(
      collection(db, "status"),
      where("state", "==", "online"),
      where("time", ">", lastDay)
    );
    getDocs(q).then((docs) => {
      const documents = docs.docs.map((document) => document.data());
      setAllUsers(documents);
    });
  }, []);

  return allUsers;
};
