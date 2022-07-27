import { useState, useEffect } from "react";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../../config/firesbaseConfig";

export const useAnonProfile = (account) => {
  const [anonProfile, setAnonProfile] = useState(false);

  useEffect(() => {
    if (account !== "0x000000000000000000000000000000000000dEaD") {
      // console.log("Reading useAnonProfile");
      const q = query(
        collection(db, "anonUsers"),
        where("account", "==", account)
      );
      const unsub = onSnapshot(q, async (doc) => {
        const profile = doc.docs.map((document) => document.data());
        setAnonProfile(profile);
      });
      return () => unsub();
    }
  }, [account]);

  return anonProfile;
};
