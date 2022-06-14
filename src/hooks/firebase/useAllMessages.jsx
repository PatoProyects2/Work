import { useState, useEffect, useContext } from 'react'
import { collection, query, onSnapshot, orderBy, limit } from "firebase/firestore";
import { db } from '../../config/firesbaseConfig'
import { Context } from '../../context/Context';

export const useAllMessages = () => {
    const [allMessages, setAllMessages] = useState(false);
    const { chatHistory } = useContext(Context);

    useEffect(() => {
        console.log('Reading useAllMessages...')
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"), limit(chatHistory))
        const unsub = onSnapshot(q, async (doc) => {
            const messages = doc.docs.map((message) => Object.assign({}, { id: message.id }, message.data()));
            setAllMessages(messages.reverse());
        });
        return () => unsub()
    }, [chatHistory])

    return allMessages;
}
