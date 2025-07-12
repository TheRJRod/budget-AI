import { useState, useEffect, useRef } from "react";

const AiRecsPage = () => {
    const [messages, setMessages] = useState([{sender:"ai", text:"Hello! I'm your AI financial assistant. I can help you analyze your spending, create budgets, and provide personalized financial advice. What would you like to know about your finances?"}])
    const [input, setInput] = useState("")
    const convoRef = useRef()

    useEffect(() => {
        convoRef.current?.scrollTo({
            top: convoRef.current.scrollHeight,
            behavior:"smooth",
        })
    }, [messages])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!input.trim()) return;

        const newMessages = [...messages, {sender:"user", text: input}]
        setMessages(newMessages)
        setInput("")

        setTimeout(() => {
            setMessages((prev) => [
                ...prev, {sender:"ai", text:"This is a simulated reply"}
            ])
        }, 500);
    }

    const handleButtonClick = (e) => {
        setInput(e.target.value)
    }

    return (
        <>
        <div className="inner-wrap">
            <div className="inner-card flex">
                <div className="chat-heading">
                    <div>
                    <img src="/vite.svg" />
                    <h2 style={{margin:0}}>AI Financial Assistant</h2>
                    </div>
                    <p style={{margin:0, marginBottom:20}}>Get personalized financial advice and insights based on your data</p>
                </div>
                <div className="chat-convo" ref={convoRef}>
                    {messages.map((msg, i) => (
                        <div key={i} className={`chat-bubble ${msg.sender === "user" ? "user" : "ai"}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div className="chat-input-container">
                    <div className="chat-input-buttons">
                        <button onClick={handleButtonClick} value="Anaylze my spending patterns">Analyze my spending patterns</button>
                        <button onClick={handleButtonClick} value="How can I save more money?">How can I save more money?</button>
                        <button onClick={handleButtonClick} value="Create a budget plan">Create a budget plan</button>
                        <button onClick={handleButtonClick} value="Debt reduction strategy">Debt reduction strategy</button>
                    </div>
                <form className="chat-input" onSubmit={handleSubmit}>
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message..." />
                    <button type="submit">Send</button>
                </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default AiRecsPage;