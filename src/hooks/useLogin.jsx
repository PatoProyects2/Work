import { useEffect, useState, useContext } from "react";
import CryptoJS from "crypto-js";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { Context } from "../context/Context";
import { db } from "../config/firesbaseConfig";
import { useMyProfile } from "../hooks/firebase/useMyProfile";

export const useLogin = () => {
  const { playerDocument, setPlayerDocument, account } = useContext(Context);
  const [user, setUser] = useState(false);

  const clientId = process.env.REACT_APP_DISCORD_CLIENTID;
  const clientSecret = process.env.REACT_APP_DISCORD_CLIENTSECRET;

  const queryParamsCode = new URLSearchParams(window.location.search);
  const codeUrl = queryParamsCode.get("code");

  const queryParamsError = new URLSearchParams(window.location.search);
  const codeError = queryParamsError.get("error");

  const localToken = window.localStorage.getItem("token");

  const redirect = "https://rpsgames.club/"; // https://rpsgames.club/, http://localhost:3000/,

  const loginUser = useMyProfile(
    (user && user.uid) ||
      (account !== "0x000000000000000000000000000000000000dEaD" && account)
  );

  useEffect(() => {
    // Setear documento en firebase del usuario si esta conectado por wallet o discord. Crear documento si no existe en firebase y esta logueado con discord
    if (loginUser) {
      setPlayerDocument(loginUser);
    }
    if (user) {
      if (loginUser === null) {
        const unixTimeStamp = Math.round(new Date().getTime() / 1000);
        const firebaseArray = {
          uid: user.uid,
          register: unixTimeStamp,
          name: user.name,
          id: user.id,
          whitelist: false,
          photo: user.photo,
          email: user.email,
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
        setDoc(doc(db, "clubUsers", user.uid), firebaseArray);
      }
    } else {
      if (loginUser === null) {
        const firebaseArray = {
          uid: "anonymous",
          name: "",
          photo: "",
          account: account,
          level: 1,
          whitelist: false,
          chat: {
            banned: false,
            unbanTime: 0,
          },
        };
        setDoc(doc(db, "anonUsers", account), firebaseArray);
      }
    }
  }, [loginUser]);

  useEffect(() => {
    // Actualizar el perfil de firebase con el usuario de discord si existen modificaciones
    if (
      playerDocument &&
      account !== "0x000000000000000000000000000000000000dEaD" &&
      user
    ) {
      if (
        playerDocument.name !== user.name ||
        playerDocument.photo !== user.photo ||
        playerDocument.account !== user.account ||
        playerDocument.email !== user.email ||
        playerDocument.id !== user.id
      ) {
        updateDoc(doc(db, "clubUsers", user.uid), user);
      }
    }
  }, [playerDocument, user, account]);

  useEffect(() => {
    getAccessToken();
  }, [codeUrl, codeError, localToken, account]);

  const getAccessToken = async () => {
    // Establecer localToken con api de discord si no existe
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

      if (userData) {
        const encrypted = CryptoJS.AES.encrypt(
          oauthData.access_token,
          process.env.REACT_APP_SECRET_KEY
        ).toString();

        window.localStorage.setItem("token", encrypted);
        window.location.href = redirect;
      }
    }

    // Leer localToken y setear usuario si existe
    if (
      account !== "0x000000000000000000000000000000000000dEaD" &&
      localToken !== null &&
      codeUrl === null
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

        window.localStorage.setItem(
          "user",
          JSON.stringify({
            id: userData.discriminator,
            uid: userData.id,
            name: userData.username,
            photo: avatar,
            email: userData.email,
            account: account,
          })
        );
        setUser(JSON.parse(window.localStorage.getItem("user")));
      }
    }

    // Redireccionar si el usuario a cancelado el login de discord
    if (codeError !== null) {
      window.location.href = redirect;
    }
  };

  return { user };
};
