import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import CryptoJS from "crypto-js";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firesbaseConfig";
import DiscordButton from "../../assets/imgs/Nav_Bar/discordButton.png";
import { Context } from "../../context/Context";
import { useMatchMedia } from "../../hooks/useMatchMedia";

const Profile = () => {
  const { setDiscordId } = useContext(Context);
  const [dropdown, setDropdown] = useState(false);
  const [user, setUser] = useState(false);
  const isMobileResolution = useMatchMedia("(max-width:500px)", false);

  const clientId = process.env.REACT_APP_DISCORD_CLIENTID;
  const clientSecret = process.env.REACT_APP_DISCORD_CLIENTSECRET;

  const queryParams = new URLSearchParams(window.location.search);
  const url = queryParams.get("code");

  const localToken = window.localStorage.getItem("token");
  const localUser = window.localStorage.getItem("user");

  useEffect(() => {
    if (localUser !== null) {
      const data = JSON.parse(localUser);
      setUser(data);
    }
  }, [localUser]);

  useEffect(() => {
    const getAccessToken = async () => {
      if (url !== null && localToken === null && localUser === null) {
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
          setDiscordId(userData.id);

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
                window.localStorage.setItem(
                  "user",
                  JSON.stringify({
                    id: data.id,
                    name: data.name,
                    photo: avatar,
                  })
                );
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
                  })
                );
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

      if (localToken !== null && localUser !== null) {
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
          setDiscordId(userData.id);
          const document = await getDoc(doc(db, "clubUsers", userData.id));
          const docData = document.data();
          if (docData) {
            const avatar = userData.avatar
              ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}`
              : "https://firebasestorage.googleapis.com/v0/b/games-club-dce4d.appspot.com/o/ClubLogo.png?alt=media&token=5dd64484-c99f-4ce9-a06b-0a3ee112b37b";
            const arrayUpdate = {
              name: userData.username,
              photo: avatar,
            };
            updateDoc(doc(db, "clubUsers", userData.id), arrayUpdate);
            window.localStorage.setItem(
              "user",
              JSON.stringify({
                id: userData.id,
                name: userData.username,
                photo: avatar,
              })
            );
          } else {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("user");
            window.localStorage.setItem("age", false);
            window.location.reload();
          }
        }
      }
    };
    getAccessToken();
    return () => {
      setDiscordId("");
    };
  }, [url, localToken, localUser]);

  const toggleMenu = () => {
    setDropdown(!dropdown);
  };

  const getToken = async () => {
    const ouathLink =
      "https://discord.com/api/oauth2/authorize?client_id=961656991149875232&redirect_uri=https%3A%2F%2Frpsgames.club%2F&response_type=code&scope=identify%20email";
    // https://discord.com/api/oauth2/authorize?client_id=961656991149875232&redirect_uri=https%3A%2F%2Frpsgames.club%2F&response_type=code&scope=identify%20email
    // https://discord.com/api/oauth2/authorize?client_id=961656991149875232&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code&scope=identify%20email"
    location.href = ouathLink;
  };

  const removeToken = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    window.location.reload();
  };

  return user ? (
    <Dropdown
      isOpen={dropdown}
      toggle={toggleMenu}
      direction="down"
      size="sm"
      className="dd-profile"
    >
      <DropdownToggle color="transparent">
        <img
          className="rounded-circle"
          width="30px"
          height="30px"
          src={user.photo}
          alt="discord-pic"
        />
      </DropdownToggle>
      <DropdownMenu>
        <NavLink to="/stats">
          <DropdownItem>
            <i className="fa-solid fa-user me-3"></i>My Profile
          </DropdownItem>
        </NavLink>
        <DropdownItem onClick={removeToken}>
          <i className="fa-solid fa-right-from-bracket me-3 text-danger"></i>
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ) : (
    <img
      role="button"
      style={isMobileResolution ? { width: "80px" } : { width: "100px" }}
      onClick={getToken}
      src={DiscordButton}
      alt="discord-button"
    />
  );
};

export default Profile;
