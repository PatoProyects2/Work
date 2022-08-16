import { useEffect, useRef, useState, useContext, useId } from "react";
import Picker from "emoji-picker-react";
// import "emoji-picker-react/dist/main.css";
import ChatMessage from "./ChatMessage";
import { Context } from "../../context/Context";
import ClubLogo from "../../assets/imgs/Views_Nfts/ClubLogo.png";
import { useMessages } from "../../hooks/socket/useMessages";

const ChatRoom = () => {
  const messagesStartRef = useRef(null);
  const messagesEndRef = useRef(null);
  const messages = useMessages();
  const { web3Data, playerDocument, socket } = useContext(Context);

  const [chatMessages, setChatMessages] = useState("");
  const [formValue, setFormValue] = useState("");
  const [warningMessages, setWarningMessages] = useState(false);
  const [emojis, setEmojis] = useState(false);

  const chatHistory = window.localStorage.getItem("chat");

  useEffect(() => {
    // Limitar mensajes por historial del chat
    if (messages && chatHistory) {
      if (messages.length > chatHistory) {
        const filterMsg = messages.slice(
          messages.length - chatHistory,
          messages.length
        );

        setChatMessages(filterMsg);
      } else {
        setChatMessages(messages);
      }
    }
  }, [messages, chatHistory]);

  useEffect(() => {
    // Emitir mensaje de bienvenida para los usuarios logueados con discord
    if (messages && socket && playerDocument) {
      const isUser = messages.find(
        (msg) => msg.text === `Welcome ${playerDocument.name}!`
      );
      if (playerDocument.uid !== "anonymous" && isUser === undefined) {
        const unixTime = Math.round(new Date().getTime() / 1000);
        const welcome = {
          text: `Welcome ${playerDocument.name}!`,
          createdAt: unixTime,
          id: 1,
          account: Math.random(),
          name: "Games Club",
          photo: playerDocument.photo,
          room: 1,
        };
        socket.emit("send_message", welcome);
      }
    }
  }, [messages, socket, playerDocument]);

  useEffect(() => {
    // Banear usuario
    const unixTime = Math.round(new Date().getTime() / 1000);
    if (messages && web3Data.account) {
      const myMessages = messages.filter(
        (messages) => messages.account === web3Data.account
      );
      const lastMessages = myMessages.filter(
        (messages) => messages.createdAt > unixTime - 60
      );
      if (lastMessages.length > 2 && !warningMessages) {
        const lastMessage = lastMessages.pop();
        const user =
          lastMessage.name !== ""
            ? lastMessage.name
            : lastMessage.account.substring(0, 5) +
              "..." +
              lastMessage.account.substring(38, 42);
        const warning = {
          text: user + " you have been banned. Reason: Spam.",
          createdAt: lastMessage.createdAt + 60,
          id: 2,
          account: Math.random(),
          name: "Moderator",
          photo: playerDocument.photo,
          room: 1,
        };
        setWarningMessages([warning]);
      }
    }
  }, [messages, web3Data.account]);

  useEffect(() => {
    // Desbanear usuario
    if (warningMessages && web3Data.account) {
      const interval = setInterval(() => {
        const unixTime = Math.round(new Date().getTime() / 1000);

        const myMessages = messages.filter(
          (messages) => messages.account === web3Data.account
        );
        const last = myMessages.filter(
          (messages) => messages.createdAt > unixTime - 60
        );

        if (last.length === 0) {
          setWarningMessages(false);
          setFormValue("");
        } else {
          setFormValue(
            "Wait " +
              (last.pop().createdAt - unixTime + 60) +
              " seconds to chat again"
          );
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [warningMessages, messages, web3Data.account]);

  const handleInputChange = (e) => {
    setFormValue(e.target.value);
  };

  const onEmojiClick = (event, emojiObject) => {
    let emoticon = emojiObject.emoji;
    if (formValue.length < 50) {
      setFormValue(formValue + emoticon);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (warningMessages) {
      setFormValue("");
      return false;
    }
    if (formValue.trim() === "") {
      setFormValue("");
      return false;
    }

    const text = formValue.trim();

    if (text !== "") {
      // const badWords =
      //   "asshole,subnormal,arse,arsehole,as useful as tits on a bull,balls,bastard,beaver,beef curtains,bell,bellend,bent,berk,bint,bitch,blighter,blimey,blimey o'reilly,bloodclaat,bloody,bloody hell,blooming,bollocks,bonk,bugger,bugger me,bugger off,built like a brick shit-house,bukkake,bullshit,cack,cad,chav,cheese eating surrender monkey,choad,chuffer,clunge,cobblers,cock,cock cheese,cock jockey,cock-up,cocksucker,cockwomble,codger,cor blimey,corey,cow,crap,crikey,cunt,daft,daft cow,damn,dick,dickhead,did he bollocks!,did i fuck as like!,dildo,dodgy,duffer,fanny,feck,flaps,fuck,fuck me sideways!,fucking cunt,fucktard,gash,ginger,git,gob shite,goddam,gorblimey,gordon bennett,gormless,he’s a knob,hell,hobknocker,I'd rather snort my own cum,jesus christ,jizz,knob,knobber,knobend,knobhead,ligger,like fucking a dying man's handshake,mad as a hatter,manky,minge,minger,minging,motherfucker,munter,muppet,naff,nitwit,nonce,numpty,nutter,off their rocker,penguin,pillock,pish,piss off,piss-flaps,pissed,pissed off,play the five-fingered flute,plonker,ponce,poof,pouf,poxy,prat,prick,prick,prickteaser,punani,punny,pussy,randy,rapey,rat arsed,rotter,rubbish,scrubber,shag,shit,shite,shitfaced,skank,slag,slapper,slut,snatch,sod,sod-off,son of a bitch,spunk,stick it up your arse!,swine,taking the piss,tart,tits,toff,tosser,trollop,tuss,twat,twonk,u fukin wanker,wally,wanker,wankstain,wazzack,whore,a tomar por culo,a tomar por saco,anda a cagar,apestar,bastardo,basura,bicho,burro,cabron,cabrón,cacorro,cagar,calientapollas,capullo,cara de culo,cara de monda,carajo,chapero,chichi,chimba,chingar,chocho,chúpame la pija,chupame la polla,chupamedias,chupamela,chupar,cipote,coger,cojonazos,cojones,come mierda y muere,coño,culiao,culo,de puta madre,estúpido,follar,forro,gilipollas,gonorrea,guarra,hijo de perra,hijo de puta,hijueputa,hostia,huevo,huevón,huevos,idiota,imbécil,jode,joder,joder ,jódete,joto,la concha de tu madre,la hostia,la madre que te parió,lame botas,loco,los cojones,maldito,malparido,mamahuevo,mamón,marica,maricon,maricón,mariconazo,mariquita,me cago en la hostia,me cago en ti,métetelo por el culo,mierda,mongolo,nabo,no me jodas,no me jodás,no seas gilipollas,pajero,payaso,pelos de los huevos,pelotas,pelotudo,pendejo,percanta,perro,pichacorta,pinche,piruja,polla,pollas en vinagre,puta,Puta madre,puto,qué cabrón,que te den,que te jodan,qué te jodan,rabo,raja,soplapollas,tarado,tonto,tonto del culo,tontopollas,trompada,un putero,verga,vete a la mierda,vete a la verga,vete al demonio,vete al infierno,zorra,zunga";
      // const wordArray = badWords.split(",");
      // const search = wordArray.some((word) => text.includes(word));
      const search = false;
      if (search) {
        window.alert("Bad words not allowed here!");
      } else {
        const unixTime = Math.round(new Date().getTime() / 1000);
        const message = {
          text: text,
          createdAt: unixTime,
          uid: playerDocument.uid,
          id: socket.id,
          account: web3Data.account,
          name: playerDocument.name,
          photo: playerDocument.photo,
          level: playerDocument.level,
          room: 1,
        };
        socket.emit("send_message", message);
        setFormValue("");
        setEmojis(false);
      }
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatMessages, warningMessages]);

  const id = useId();
  return (
    <div className="chatting_chat_msgs">
      <div className="chat_input_hold">
        <div className="background-messages">
          <h1>Chat Room</h1>
        </div>
        <div className="chat_msgs">
          <ul className="messages">
            {chatMessages &&
              chatMessages.map((msg, index) => (
                <ChatMessage key={`${id}-${index}`} index={index} {...msg} />
              ))}
            {warningMessages &&
              warningMessages.map((msg, index) => (
                <li className="warning-message" key={`${id}-${index}`}>
                  <div className="chat-users">
                    <div className="d-flex">
                      <img
                        className="chat_user_img"
                        src={msg.photo}
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = ClubLogo;
                        }}
                      />
                      &nbsp;
                    </div>
                    <div>
                      <span className="text-red">{msg.name + ": "}</span>
                      <span className="chat_cont">{msg.text}</span>
                    </div>
                  </div>
                </li>
              ))}
            <div ref={messagesEndRef}></div>
          </ul>
        </div>

        {emojis && (
          <div className="emojis_modal">
            <Picker
              onEmojiClick={onEmojiClick}
              groupNames={{ smileys_people: "PEOPLE" }}
              pickerStyle={{
                width: "100%",
                boxShadow: "none",
              }}
              disableSearchBar={true}
              disableSkinTonePicker={true}
              preload={false}
            />
          </div>
        )}

        <form onSubmit={sendMessage}>
          <div
            className={
              !playerDocument || warningMessages
                ? "chat_input_contain disabled"
                : "chat_input_contain"
            }
          >
            <input
              type="text"
              className="chat_input"
              placeholder={
                playerDocument ? "Type something..." : "Connect wallet to chat"
              }
              value={formValue}
              onChange={handleInputChange}
              maxLength="80"
              disabled={!playerDocument || warningMessages}
              spellCheck="false"
            />
            <div className="chat_buttons">
              <div
                role="button"
                className={emojis ? "chat_btn_selected" : "chat_btn"}
                onClick={() => setEmojis(!emojis)}
              >
                <i className="fas fa-smile"></i>
              </div>
              <button type="submit" className="chat_btn">
                <i className="fa fa-paper-plane" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
