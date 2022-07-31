import { useEffect, useContext } from "react";
import { setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firesbaseConfig";
import { Context } from "../context/Context";

export const useOnline = ({ allUsers }) => {
  const { account } = useContext(Context);

  useEffect(() => {
    if (account !== "0x000000000000000000000000000000000000dEaD" && allUsers) {
      const unixTime = Math.round(new Date().getTime() / 1000);
      const userState = allUsers.find((user) => user.account === account);
      if (userState) {
        if (userState.time < unixTime - 3600) {
          console.log("Writing");
          updateDoc(doc(db, "status", account), {
            time: unixTime,
          });
        }
      } else {
        console.log("Writing");
        setDoc(doc(db, "status", account), {
          account: account,
          state: "online",
          time: unixTime,
        });
      }
    }
  }, [account, allUsers]);

  return;
};
