import { useState, useRef, useEffect } from 'react'
import { Chatbot } from 'supersimpledev'
import './App.css'

function ChatInput({ chatMessages, setChatMessages }) {
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
                        id: crypto.randomUUID()
                    }
                ]
                
                setChatMessages([
                    ...newChatMessages,
                    {
                        message: <img src="./images/loading-spinner.gif" className="spinner" />,
                        sender: 'robot',
                        id: crypto.randomUUID()
                    }
                ]);

                const response = await Chatbot.getResponseAsync(inputText);

                setChatMessages([
                    ...newChatMessages,
                    {
                        message: response,
                        sender: 'robot',
                        id: crypto.randomUUID()
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
            </div>
            )
        }

    function ChatMessage({ message, sender }) {
        return (
            <div className={
                sender === 'user'
                    ? 'chat-message-user'
                    : 'chat-message-robot'
            }>

                { sender === 'robot' && (
                    <img src="robot.png" className="chat-message-profile" />
                ) }

                <div className="chat-message-text">
                    { message }
                </div>

                { sender === 'user' && (
                    <img src="user.png" className="chat-message-profile" />
                )}

            </div>
    )

    }

    function ChatMessages({ chatMessages }) {
        const chatMessageRef = useRef(null);

        useEffect(() => {
            const containerElement = chatMessageRef.current;
            if (containerElement) {
                containerElement.scrollTop = containerElement.scrollHeight;
            }
        }, [chatMessages]);

        return (
            <div 
                className="chat-message-container" 
                ref={chatMessageRef}
            >
                { chatMessages.map((chatMessage) => {
                        return (
                            <ChatMessage 
                                message = {chatMessage.message} 
                                sender = {chatMessage.sender}
                                key = {chatMessage.id} 
                            />
                        );
                    }) }
            </div>
        )
    }


function App() {
        const [chatMessages, setChatMessages] = useState([]);

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
