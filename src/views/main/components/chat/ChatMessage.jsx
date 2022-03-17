import React from 'react'
function ChatMessage({ text, uid, photo, name, level, auth }) {
    const messageClass = null
    try {
        messageClass = uid === auth.currentUser.uid ? 'sent' : 'recieved';
    } catch (e) {

    }
    return (
        // <div className={`message ${messageClass}`}>
        //     <p><img widht="25" height="25" src={photo} />{name + " " + level + " : " + text}</p>
        // </div>
        <li className={`message ${messageClass} d-flex align-items-center mt-2`}>
            <img className="chat_user_img" src={photo} alt={name} />
            <span className="xp-user games-logo">
                <span className="level_val">Lvl: { level }</span>
            </span>
            <span className="chat_user_name">{name}:</span>
            <div className="chat_cont">{text}</div>
        </li>
    )
}
export default ChatMessage