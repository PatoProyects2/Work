import React from 'react'
function ChatMessage({ text, uid, photo, name, level, auth }) {
    const messageClass = null
    try {
        messageClass = uid === auth.currentUser.uid ? 'sent' : 'recieved';
    } catch (e) {

    }
    return (
        <div className={`message ${messageClass}`}>
            <p><img widht="25" height="25" src={photo} />{name + " " + level + " : " + text}</p>
        </div>
    )
}
export default ChatMessage