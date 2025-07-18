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
            <div className="inner-card flex ">
                <div className="chat-heading bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-6">
                    <div>
                    <img src="/vite.svg" />
                    <h2 className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent" style={{margin:0, fontWeight:'bold'}}>AI Financial Assistant</h2>
                    </div>
                    <p className="text-slate-400" style={{margin:0}}>Get personalized financial advice and insights based on your data</p>
                </div>
                <div className="chat-convo bg-slate-800/50 border-slate-700/50 backdrop-blur-xl" ref={convoRef}>
                    {messages.map((msg, i) => (
                        <div key={i} className={`chat-bubble ${msg.sender === "user" ? "user rounded-xl p-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25" : "ai rounded-xl p-4 bg-slate-700/50 border border-slate-600/50 text-slate-100 backdrop-blur-sm"}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div className="chat-input-container bg-slate-800/50 border-slate-700/50 backdrop-blur-xl">
                    <div className="chat-input-buttons">
                        <button className="text-slate-400 text-xs bg-slate-700/50 border-slate-600 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 hover:text-white hover:border-cyan-500/50 transition-all duration-200 px-3 h-9 border rounded-md" onClick={handleButtonClick} value="Anaylze my spending patterns">Analyze my spending patterns</button>
                        <button className="text-slate-400 text-xs bg-slate-700/50 border-slate-600 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 hover:text-white hover:border-cyan-500/50 transition-all duration-200 px-3 h-9 border rounded-md" onClick={handleButtonClick} value="How can I save more money?">How can I save more money?</button>
                        <button className="text-slate-400 text-xs bg-slate-700/50 border-slate-600 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 hover:text-white hover:border-cyan-500/50 transition-all duration-200 px-3 h-9 border rounded-md" onClick={handleButtonClick} value="Create a budget plan">Create a budget plan</button>
                        <button className="text-slate-400 text-xs bg-slate-700/50 border-slate-600 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-purple-500/20 hover:text-white hover:border-cyan-500/50 transition-all duration-200 px-3 h-9 border rounded-md" onClick={handleButtonClick} value="Debt reduction strategy">Debt reduction strategy</button>
                    </div>
                    <form style={{padding:"0 16px 16px"}} onSubmit={handleSubmit} className="flex gap-2">
                        <input  value={input} onChange={(e) => setInput(e.target.value)} className="flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/25" placeholder="Ask me about your finances..."/>
                        <button  type="submit" class="ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-primary/90 h-10 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white shadow-lg shadow-cyan-500/25" disabled={input.trim().length === 0}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send h-4 w-4"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg></button>
                        </form>
                
                </div>
            </div>
        </div>
        </>
    )
}

export default AiRecsPage;