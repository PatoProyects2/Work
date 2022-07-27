import { useEffect, useState, useContext } from "react";
import CryptoJS from "crypto-js";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { Context } from "../context/Context";
import { db } from "../config/firesbaseConfig";

export const useLogin = () => {
  const { setDiscordId } = useContext(Context);
  const [user, setUser] = useState(false);

  const clientId = process.env.REACT_APP_DISCORD_CLIENTID;
  const clientSecret = process.env.REACT_APP_DISCORD_CLIENTSECRET;

  const queryParams = new URLSearchParams(window.location.search);
  const url = queryParams.get("code");

  const localToken = window.localStorage.getItem("token");

  useEffect(() => {
    getAccessToken();
  }, [url, localToken]);

  const getAccessToken = async () => {
    if (url !== null && localToken === null) {
      const apiConfig = {
        method: "POST",
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          code: url,
          grant_type: "authorization_code",
          redirect_uri: "https://rpsgames.club/", // https://rpsgames.club/, http://localhost:3000/,
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
        var encrypted = CryptoJS.AES.encrypt(
          oauthData.access_token,
          process.env.REACT_APP_SECRET_KEY
        ).toString();
        window.localStorage.setItem("token", encrypted);

        getDoc(doc(db, "clubUsers", userData.id))
          .then((document) => {
            const avatar = userData.avatar
              ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}`
              : "https://firebasestorage.googleapis.com/v0/b/games-club-dce4d.appspot.com/o/ClubLogo.png?alt=media&token=5dd64484-c99f-4ce9-a06b-0a3ee112b37b";

            const data = document.data();
            if (data) {
              setDiscordId(data.uid);
              window.localStorage.setItem(
                "user",
                JSON.stringify({
                  id: data.uid,
                  name: data.name,
                  photo: avatar,
                  level: data.level,
                })
              );
              setUser(JSON.parse(window.localStorage.getItem("user")));
              window.localStorage.setItem("age", false);
            } else {
              const avatar = userData.avatar
                ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}`
                : "https://firebasestorage.googleapis.com/v0/b/games-club-dce4d.appspot.com/o/ClubLogo.png?alt=media&token=5dd64484-c99f-4ce9-a06b-0a3ee112b37b";

              window.localStorage.setItem(
                "user",
                JSON.stringify({
                  id: userData.id,
                  name: userData.username,
                  photo: avatar,
                  level: 1,
                })
              );
              setUser(JSON.parse(window.localStorage.getItem("user")));
              window.localStorage.setItem("age", false);
              const unixTimeStamp = Math.round(new Date().getTime() / 1000);
              const arrayData = {
                uid: userData.id,
                register: unixTimeStamp,
                name: userData.username,
                id: userData.discriminator,
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
                account: "",
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
                  lastGameBlock: 0,
                },
              };
              setDoc(doc(db, "clubUsers", userData.id), arrayData);
            }
          })
          .catch(console.log);
      }
    }

    if (localToken !== null) {
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
        const document = await getDoc(doc(db, "clubUsers", userData.id));
        const docData = document.data();
        if (docData) {
          setDiscordId(docData.uid);
          const avatar = userData.avatar
            ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}`
            : "https://firebasestorage.googleapis.com/v0/b/games-club-dce4d.appspot.com/o/ClubLogo.png?alt=media&token=5dd64484-c99f-4ce9-a06b-0a3ee112b37b";
          const arrayUpdate = {
            name: userData.username,
            photo: avatar,
            level: docData.level,
          };
          updateDoc(doc(db, "clubUsers", userData.id), arrayUpdate);
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
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("user");
          window.localStorage.removeItem("age");
          window.localStorage.removeItem("sound");
          window.localStorage.removeItem("gas");
          window.localStorage.removeItem("chat");
          window.localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
          window.location.reload();
        }
      }
    }
  };

  return { user };
};
