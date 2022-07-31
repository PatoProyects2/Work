import { useEffect, useState, useContext } from "react";
import CryptoJS from "crypto-js";
import {
  doc,
  setDoc,
  updateDoc,
  query,
  onSnapshot,
  collection,
  where,
} from "firebase/firestore";
import { Context } from "../context/Context";
import { db } from "../config/firesbaseConfig";

export const useLogin = () => {
  const { setPlayerDocument, account } = useContext(Context);
  const [user, setUser] = useState(false);

  const clientId = process.env.REACT_APP_DISCORD_CLIENTID;
  const clientSecret = process.env.REACT_APP_DISCORD_CLIENTSECRET;

  const queryParamsCode = new URLSearchParams(window.location.search);
  const codeUrl = queryParamsCode.get("code");

  const queryParamsError = new URLSearchParams(window.location.search);
  const codeError = queryParamsError.get("error");

  const localToken = window.localStorage.getItem("token");

  useEffect(() => {
    getAccessToken();
  }, [codeUrl, codeError, localToken, account]);

  const getAccessToken = async () => {
    const redirect = "https://rpsgames.club/"; // https://rpsgames.club/, http://localhost:3000/,

    if (
      account !== "0x000000000000000000000000000000000000dEaD" &&
      codeUrl !== null &&
      localToken === null
    ) {
      const apiConfig = {
        method: "POST",
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          code: codeUrl,
          grant_type: "authorization_code",
          redirect_uri: redirect,
          scope: "identify email",
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      const oauthResult = await fetch(
        "https://discord.com/api/oauth2/token",
        apiConfig
      );
      const oauthData = await oauthResult.json();

      const userResult = await fetch("https://discord.com/api/users/@me", {
        headers: {
          authorization: `${oauthData.token_type} ${oauthData.access_token}`,
        },
      });
      const userData = await userResult.json();

      if (userData.id) {
        const encrypted = CryptoJS.AES.encrypt(
          oauthData.access_token,
          process.env.REACT_APP_SECRET_KEY
        ).toString();
        window.localStorage.setItem("token", encrypted);
        window.location.href = redirect;
      }
    }

    if (
      account !== "0x000000000000000000000000000000000000dEaD" &&
      localToken !== null
    ) {
      var decrypted = CryptoJS.AES.decrypt(
        localToken,
        process.env.REACT_APP_SECRET_KEY
      );
      var token = decrypted.toString(CryptoJS.enc.Utf8);
      const userResult = await fetch("https://discord.com/api/users/@me", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const userData = await userResult.json();

      if (userData) {
        const avatar = userData.avatar
          ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}`
          : "";
        const arrayUpdate = {
          name: userData.username,
          photo: avatar,
          account: account,
        };

        console.log("Writing");
        updateDoc(doc(db, "clubUsers", userData.id), arrayUpdate);

        const q = query(
          collection(db, "clubUsers"),
          where("uid", "==", userData.id)
        );

        console.log("Reading");
        const unsub = onSnapshot(q, async (docs) => {
          const docData = docs.docs.map((document) => document.data());
          if (docData[0]) {
            setPlayerDocument(docData[0]);
            window.localStorage.setItem(
              "user",
              JSON.stringify({
                id: userData.id,
                name: userData.username,
                photo: avatar,
                level: docData.level,
              })
            );

            setUser(JSON.parse(window.localStorage.getItem("user")));
          } else {
            console.log("No data");
            window.localStorage.setItem(
              "user",
              JSON.stringify({
                id: userData.id,
                name: userData.username,
                photo: avatar,
                level: 1,
              })
            );
            window.localStorage.setItem("age", false);

            setUser(JSON.parse(window.localStorage.getItem("user")));

            const unixTimeStamp = Math.round(new Date().getTime() / 1000);
            const arrayData = {
              uid: userData.id,
              register: unixTimeStamp,
              name: userData.username,
              id: userData.discriminator,
              whitelist: false,
              photo: avatar,
              banner: {
                file: userData.banner,
                color: userData.banner_color,
              },
              email: userData.email,
              dsVerified: userData.verified,
              chat: {
                banned: false,
                unbanTime: 0,
              },
              level: 1,
              games: ["RPS"],
              account: account,
              rps: {
                rock: 0,
                paper: 0,
                scissors: 0,
                winStreak: 0,
                topWinStreak: 0,
                gameWon: 0,
                gameLoss: 0,
                amountWon: 0,
                amountLoss: 0,
              },
            };
            setDoc(doc(db, "clubUsers", userData.id), arrayData);
          }
        });
      }
    }

    if (
      account !== "0x000000000000000000000000000000000000dEaD" &&
      localToken === null
    ) {
      console.log("Reading");

      const q = query(
        collection(db, "anonUsers"),
        where("account", "==", account)
      );
      const unsub = onSnapshot(q, async (docs) => {
        const docData = docs.docs.map((document) => document.data());
        if (docData[0]) {
          setPlayerDocument(docData[0]);
        } else {
          const arrayData = {
            uid: "anonymous",
            account: account,
            name: "",
            photo: "",
            level: 1,
            whitelist: false,
            chat: {
              banned: false,
              unbanTime: 0,
            },
          };
          setDoc(doc(db, "anonUsers", account), arrayData);
          window.location.reload();
        }
      });
    }

    if (codeError !== null) {
      window.location.href = redirect;
    }
  };

  return { user };
};
