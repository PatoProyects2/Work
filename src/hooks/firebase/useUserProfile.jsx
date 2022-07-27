import { useState, useEffect } from "react";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../../config/firesbaseConfig";

export const useUserProfile = (uid) => {
  const [userProfile, setUserProfile] = useState(false);

  useEffect(() => {
    if (uid !== "" && uid !== undefined) {
      // console.log("Reading useUserProfile");
      const q = query(collection(db, "clubUsers"), where("uid", "==", uid));
      const unsub = onSnapshot(q, async (doc) => {
        const profile = doc.docs.map((document) => document.data());
        setUserProfile(profile);
      });
      return () => unsub();
    }
  }, [uid]);

  return userProfile;
};
