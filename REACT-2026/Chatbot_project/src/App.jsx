import { useEffect, useState } from 'react'
import { Chatbot } from 'supersimpledev'
import { ChatInput } from './components/ChatInput';
import { ChatMessage } from './components/ChatMessage';
import ChatMessages from './components/ChatMessages'
import './App.css'

function App() {
        const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);
        // Ex 5h
        useEffect(()=> {
            Chatbot.addResponses({
                "Assalam": "Wa'alaikussalam",
                "Ykk": "cool! wane taimako kake so?",
                "Hack all": "Ransomeware Initialize..."
            });
        }, []);

        useEffect(() => {
            localStorage.setItem('messages', JSON.stringify(chatMessages));
        }, [chatMessages]);

        return (
            <div className="app-container">
                {chatMessages.length === 0 && (
                    <p className="welcome-sms">
                        Welcome to Zacks Bot Ask a Anything regarding Ur DATA/AIRTIME PURChase.
                    </p>
                )}
                <ChatMessages chatMessages={chatMessages} />
                <ChatInput 
                    chatMessages={chatMessages} 
                    setChatMessages={setChatMessages}
                />
            </div>
        );
    }

export default App
