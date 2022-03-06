import React from 'react'

function ChatMessage( { text , uid ,photoURL, auth}) {
   const messageClass = uid === auth.currentUser.uid ?'sent' : 'recieved' ;  
  return (
      <div className={`message ${messageClass}`}>
          <img src={photoURL}/>
          <p>{text}</p>
      </div>
  )
}

export default ChatMessage