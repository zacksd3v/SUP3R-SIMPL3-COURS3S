import dayjs from 'dayjs'
import { useState } from 'react'
import { Chatbot } from 'supersimpledev'
import LoadingSpinner  from '../assets/loading-spinner.gif'
import './ChatInput.css'

export function ChatInput({ chatMessages, setChatMessages }) {
    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function saveText(event) {
        setInputText(event.target.value);
    }

    async function sendMessages() {
        if (isLoading || inputText === '') {
            return;
        }

        setIsLoading(true);

        setInputText('');

        const newChatMessages = [
            ...chatMessages,
            {
                message: inputText,
                sender: 'user',
                id: crypto.randomUUID(),
                time: dayjs().valueOf()
            }
        ]
        
        setChatMessages([
            ...newChatMessages,
            {
                message: <img src={LoadingSpinner} className="spinner" />,
                sender: 'robot',
                id: crypto.randomUUID(),
                time: dayjs().valueOf()
            }
        ]);

        const response = await Chatbot.getResponseAsync(inputText);

        setChatMessages([
            ...newChatMessages,
            {
                message: response,
                sender: 'robot',
                id: crypto.randomUUID(),
                time: dayjs().valueOf()
            }
        ]);

        setIsLoading(false);
    }

    function enterKey(event) {
        if (event.key === 'Enter') {
            sendMessages();
        }
        if (event.key === 'Escape') {
            setInputText('');
        }
    }

    function ClearMessages() {
        setChatMessages([]);
    }

    return (
    <div className="chat-input-container">
        <input 
            placeholder="Send a message to Zacks chatb0t" 
            size="30" 
            onChange={saveText}
            value={inputText}
            onKeyDown={enterKey}
            className="chat-input"
        />
        <button
            onClick={sendMessages}
            className="send-button"
        >Send</button>
        <button
            onClick={ClearMessages}
            className="clear-button"
        >Clear</button>
    </div>
    )
}
