import { useEffect, useState, useContext } from "react";
import CryptoJS from "crypto-js";
import { doc, updateDoc, setDoc, arrayUnion } from "firebase/firestore";
import { Context } from "../context/Context";
import { db } from "../config/firebase/firesbaseConfig";
import { useClubUsers } from "../hooks/socket/useClubUsers";
import { useAnonUsers } from "../hooks/socket/useAnonUsers";

export const useLogin = () => {
  const { playerDocument, setPlayerDocument, web3Data, socket } =
    useContext(Context);
  const clubUsers = useClubUsers();
  const anonUsers = useAnonUsers();
  const [user, setUser] = useState(false);

  const clientId = process.env.REACT_APP_DISCORD_CLIENTID;
  const clientSecret = process.env.REACT_APP_DISCORD_CLIENTSECRET;

  const queryParamsCode = new URLSearchParams(window.location.search);
  const codeUrl = queryParamsCode.get("code");

  const queryParamsError = new URLSearchParams(window.location.search);
  const codeError = queryParamsError.get("error");

  const localToken = window.localStorage.getItem("token");

  const redirect = process.env.REACT_APP_DISCORD_URL;

  useEffect(() => {
    getAccessToken(); // Setea o lee el token de acceso
  }, [codeUrl, codeError, localToken, web3Data.account]);

  useEffect(() => {
    // Setea el documento de firebase y si no existe lo crea
    if (user) {
      if (clubUsers.length > 0 && web3Data.account) {
        const clubUser = clubUsers.find((club) => club.uid === user.uid);
        if (clubUser === null || clubUser === undefined) {
          const unixTimeStamp = Math.round(new Date().getTime() / 1000);
          const firebaseArray = {
            uid: user.uid,
            register: unixTimeStamp,
            name: user.name,
            id: user.id,
            whitelist: false,
            photo: user.photo,
            email: user.email,
            level: 1,
            games: ["RPS"],
            account: [web3Data.account],
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
          socket.emit("send_clubUsers", 1);
          setDoc(doc(db, "clubUsers", user.uid), firebaseArray);
        } else {
          if (!playerDocument) {
            setPlayerDocument(clubUser);
          }
        }
      }
    } else {
      if (anonUsers.length > 0 && web3Data.account) {
        const anonUser = anonUsers.find(
          (anon) => anon.account === web3Data.account
        );
        if (anonUser === null || anonUser === undefined) {
          const firebaseArray = {
            uid: "anonymous",
            name: "",
            photo: "",
            account: web3Data.account,
            level: 1,
            whitelist: false,
          };
          setDoc(doc(db, "anonUsers", web3Data.account), firebaseArray);
        } else {
          if (!playerDocument) {
            setPlayerDocument(anonUser);
          }
        }
      }
    }
  }, [user, clubUsers, anonUsers, web3Data.account]);

  useEffect(() => {
    // Actualizar el perfil de firebase si existen modificaciones en el usuario de discord
    if (playerDocument && web3Data.account && user) {
      if (playerDocument.uid !== "anonymous") {
        const isAccount = playerDocument.account.find(
          (account) => account === user.account
        );
        if (
          playerDocument.name !== user.name ||
          playerDocument.photo !== user.photo ||
          isAccount === undefined ||
          playerDocument.email !== user.email ||
          playerDocument.id !== user.id
        ) {
          const arrayUpdate = {
            name: user.name,
            photo: user.photo,
            account: arrayUnion(user.account),
            email: user.email,
            id: user.id,
          };
          updateDoc(doc(db, "clubUsers", user.uid), arrayUpdate);
        }
      }
    }
  }, [playerDocument, user]);

  const getAccessToken = async () => {
    // Setear localToken de discord
    if (web3Data.account && codeUrl !== null && localToken === null) {
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

    // Leer localToken y setear usuario
    if (web3Data.account && localToken !== null && codeUrl === null) {
      // Desencriptar localToken
      var decrypted = CryptoJS.AES.decrypt(
        localToken,
        process.env.REACT_APP_SECRET_KEY
      );
      var token = decrypted.toString(CryptoJS.enc.Utf8);

      try {
        // Comprobar si el token de discord es valido
        const userResult = await fetch("https://discord.com/api/users/@me", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const userData = await userResult.json();

        // Si es valido setea el usuario
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
              account: web3Data.account,
            })
          );
          setUser(JSON.parse(window.localStorage.getItem("user")));
        }
      } catch (err) {
        // Si no es valido elimina el token de acceso y recarga pagina
        window.localStorage.removeItem("token");
        window.location.href = redirect;
      }
    }

    // Redireccionar si el usuario a cancelado el login de discord
    if (codeError !== null) {
      window.location.href = redirect;
    }
  };

  return { user };
};
