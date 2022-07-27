import { useContext, useEffect } from "react";
import { doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { Context } from "../../context/Context";
import { db } from "../../config/firesbaseConfig";

export const useProfile = () => {
  const { account, discordId, setPlayerDocument } = useContext(Context);

  useEffect(() => {
    const deadWallet = "0x000000000000000000000000000000000000dEaD";
    if (account !== undefined && account !== deadWallet) {
      const query =
        discordId !== ""
          ? doc(db, "clubUsers", discordId)
          : doc(db, "anonUsers", account);
      const unsub = onSnapshot(query, async (document) => {
        const profile = document.data();
        if (profile) {
          setPlayerDocument(profile);
          if (profile.account === "") {
            updateDoc(doc(db, "clubUsers", discordId), {
              account: account,
            });
          }
        } else {
          const arrayData = {
            uid: "anonymous",
            account: account,
            name: "",
            photo:
              "https://firebasestorage.googleapis.com/v0/b/games-club-dce4d.appspot.com/o/ClubLogo.png?alt=media&token=5dd64484-c99f-4ce9-a06b-0a3ee112b37b",
            level: 1,
            chat: {
              banned: false,
              unbanTime: 0,
            },
          };
          setDoc(doc(db, "anonUsers", account), arrayData);
        }
      });

      return () => unsub();
    }
  }, [account, discordId]);

  return;
};
