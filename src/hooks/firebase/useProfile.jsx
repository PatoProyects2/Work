import { useState, useEffect, useContext } from "react";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { db } from "../../config/firesbaseConfig";
import { Context } from "../../context/Context";

export const useProfile = () => {
  const [myProfile, setMyProfile] = useState(false);
  const { discordId } = useContext(Context);
  console.log(discordId);
  useEffect(() => {
    if (discordId !== "") {
      console.log("Reading useProfile...");
      const q = query(
        collection(db, "clubUsers"),
        where("uid", "==", discordId)
      );
      const unsub = onSnapshot(q, async (doc) => {
        const profile = doc.docs[0].data();
        setMyProfile(profile);
      });
      return () => unsub();
    }
  }, [discordId]);

  return myProfile;
};
