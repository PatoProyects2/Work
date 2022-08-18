import { useEffect, useState } from "react";
import { Modal, Group, Button } from "./components/SettingModal";

const Settings = () => {
  const [sound, setSound] = useState(window.localStorage.getItem("sound"));
  const [gas, setGas] = useState(window.localStorage.getItem("gas"));
  const [chat, setChat] = useState(window.localStorage.getItem("chat"));

  const age = window.localStorage.getItem("chat");

  // Crear ajustes si no estan definidos por defecto
  useEffect(() => {
    if (sound === null || gas === null || chat === null || age === null) {
      window.localStorage.setItem("sound", "on");
      window.localStorage.setItem("gas", "instant");
      window.localStorage.setItem("chat", "50");
      window.localStorage.setItem("age", false);
      setSound(window.localStorage.getItem("sound"));
      setGas(window.localStorage.getItem("gas"));
      setChat(window.localStorage.getItem("chat"));
    }
  }, [sound, gas, chat, age]);

  return (
    <Modal>
      <Group title="Sound">
        <Button
          storage={sound}
          setStorage={setSound}
          item="sound"
          value="off"
          color="red"
          label={<i className="fas fa-volume-mute"></i>}
        />
        <Button
          storage={sound}
          setStorage={setSound}
          item="sound"
          value="on"
          color="green"
          label={<i className="fas fa-volume-up"></i>}
        />
      </Group>
      <Group title="Transaction speed (GWEI)">
        <Button
          storage={gas}
          setStorage={setGas}
          item="gas"
          value="standard"
          color="red"
          label="Standard"
        />
        <Button
          storage={gas}
          setStorage={setGas}
          item="gas"
          value="fast"
          color="yellow"
          label="Fast"
        />
        <Button
          storage={gas}
          setStorage={setGas}
          item="gas"
          value="instant"
          color="green"
          label="Instant"
        />
      </Group>
      <Group title="Chat history duration">
        <Button
          storage={chat}
          setStorage={setChat}
          item="chat"
          value="300"
          color="red"
          label="300"
        />
        <Button
          storage={chat}
          setStorage={setChat}
          item="chat"
          value="100"
          color="yellow"
          label="100"
        />
        <Button
          storage={chat}
          setStorage={setChat}
          item="chat"
          value="50"
          color="green"
          label="50"
        />
      </Group>
    </Modal>
  );
};

export default Settings;
