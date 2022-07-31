import { useState, useEffect } from "react";

export const useChatBan = ({
  playerDocument,
  account,
  unixTime,
  db,
  doc,
  updateDoc,
}) => {
  const [banValue, setBanValue] = useState("");

  useEffect(() => {
    if (playerDocument) {
      var banned = playerDocument.chat.banned;
      var unbanTime = playerDocument.chat.unbanTime;
      var time = unbanTime - unixTime;

      if (time > 0 && banned) {
        setBanValue("You are banned for " + time + " seconds");
      }

      if (time < 0 && banned) {
        setBanValue("");
        const document =
          playerDocument.uid === "anonymous"
            ? doc(db, "anonUsers", account)
            : doc(db, "clubUsers", playerDocument.uid);
        updateDoc(document, {
          chat: {
            banned: false,
            unbanTime: 0,
          },
        });
      }
    }
  }, [account, playerDocument, unixTime]);

  return banValue;
};
