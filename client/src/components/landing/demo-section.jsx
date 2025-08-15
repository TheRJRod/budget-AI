import { useState } from "react"
import { Play, Pause, RotateCcw, Bot, User, Sparkles, ArrowRight, Send } from "lucide-react"

export function DemoSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content:
        "Hi! I'm your AI financial advisor. I've analyzed your spending patterns and I'm ready to help optimize your finances. What would you like to know?",
      timestamp: "2:34 PM",
    },
  ])

  const demoConversation = [
    {
      user: "How can I save more money each month?",
      assistant:
        "Based on your spending data, I've identified 3 key opportunities:\n\n💡 **Subscription Optimization**: You're spending $127/month on subscriptions but only actively use 60% of them. Canceling unused services could save $45/month.\n\n🍕 **Food Delivery**: Your food delivery spending increased 40% this month to $280. Meal planning 2-3 days per week could reduce this by $80/month.\n\n🚗 **Transportation**: Consider carpooling or public transit twice a week - potential savings of $35/month.\n\n**Total potential savings: $160/month** 📈",
    },
    {
      user: "Should I invest my emergency fund surplus?",
      assistant:
        "Great question! I see you have $8,500 in your emergency fund, which exceeds your 6-month target of $7,200.\n\n✅ **Safe to invest**: $1,300 surplus\n\n**My recommendations**:\n• Move $1,000 to a high-yield savings account (4.5% APY)\n• Invest $300 in a diversified index fund\n• Keep the extra $300 as a buffer\n\n⚠️ **Important**: Only invest what you won't need for 5+ years. Your emergency fund should stay liquid and accessible.",
    },
    {
      user: "Am I on track for my vacation goal?",
      assistant:
        "Excellent news! 🎉 You're actually **ahead of schedule** for your Japan vacation goal.\n\n**Current Progress**:\n• Goal: $5,000 by August 2024\n• Saved: $2,800 (56% complete)\n• Monthly target: $400\n• Actual average: $465/month\n\n📊 **Projection**: At your current rate, you'll reach your goal by **June 2024** - 2 months early!\n\n💡 **Suggestion**: Consider increasing your goal to $6,000 for extra activities, or redirect the surplus to your next priority goal.",
    },
  ]

  const playDemo = () => {
    setIsPlaying(true)
    setMessages([messages[0]]) // Reset to initial message
    setCurrentStep(0)

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        const next = prev + 1
        if (next <= demoConversation.length) {
          // Add user message
          if (next <= demoConversation.length) {
            setTimeout(() => {
              setMessages((prev) => [
                ...prev,
                {
                  id: prev.length + 1,
                  role: "user",
                  content: demoConversation[next - 1].user,
                  timestamp: "2:35 PM",
                },
              ])

              // Add AI response after a delay
              setTimeout(() => {
                setMessages((prev) => [
                  ...prev,
                  {
                    id: prev.length + 1,
                    role: "assistant",
                    content: demoConversation[next - 1].assistant,
                    timestamp: "2:35 PM",
                  },
                ])
              }, 1500)
            }, 500)
          }
        }
        return next
      })
    }, 4000)

    setTimeout(() => {
      clearInterval(interval)
      setIsPlaying(false)
    }, 12000)
  }

  const resetDemo = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    setMessages([
      {
        id: 1,
        role: "assistant",
        content:
          "Hi! I'm your AI financial advisor. I've analyzed your spending patterns and I'm ready to help optimize your finances. What would you like to know?",
        timestamp: "2:34 PM",
      },
    ])
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-300 px-4 py-2">
            <Play className="h-4 w-4 mr-2" />
            AI Chat Demo
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Your Personal
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              AI Financial Advisor
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Experience how our AI analyzes your financial data and provides personalized, actionable recommendations in
            real-time conversations.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Demo Controls */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">See AI in Action</h3>
              <p className="text-slate-400">
                Watch how our AI advisor analyzes spending patterns, identifies opportunities, and provides personalized
                recommendations based on real financial data.
              </p>
            </div>

            {/* Demo Features */}
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles className="h-5 w-5 text-yellow-400" />
                  <h4 className="font-semibold text-white">Smart Analysis</h4>
                </div>
                <p className="text-sm text-slate-400">
                  AI reviews your spending patterns and identifies optimization opportunities
                </p>
              </div>

              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <div className="flex items-center gap-3 mb-2">
                  <Bot className="h-5 w-5 text-cyan-400" />
                  <h4 className="font-semibold text-white">Personalized Advice</h4>
                </div>
                <p className="text-sm text-slate-400">
                  Get tailored recommendations based on your unique financial situation
                </p>
              </div>

              <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <div className="flex items-center gap-3 mb-2">
                  <ArrowRight className="h-5 w-5 text-purple-400" />
                  <h4 className="font-semibold text-white">Actionable Insights</h4>
                </div>
                <p className="text-sm text-slate-400">
                  Receive specific, measurable steps to improve your financial health
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex gap-4">
              <button
                onClick={playDemo}
                disabled={isPlaying}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
              >
                {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                {isPlaying ? "Playing Demo..." : "Start Demo"}
              </button>
              <button
                onClick={resetDemo}
                variant="outline"
                className="bg-slate-800/50 border-slate-600 text-slate-300 hover:text-white"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </button>
            </div>
          </div>

          {/* AI Chat Interface */}
          <div className="relative">
            <div className="bg-slate-800/50 backdrop-blur-xl border-slate-700/50 h-[600px] flex flex-col">
              <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                  <div className="text-white flex items-center gap-2">
                    <div className="relative">
                      <Bot className="h-6 w-6 text-cyan-400" />
                      <div className="absolute inset-0 h-6 w-6 text-cyan-400 animate-pulse blur-sm" />
                    </div>
                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      AI Financial Advisor
                    </span>
                    <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
                  </div>
                  <div className="bg-green-500/20 text-green-300 border-green-500/50">Online</div>
                </div>
                <div className="text-slate-400">
                  Powered by advanced financial AI • Analyzing your data in real-time
                </div>
              </div>

              <div className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.role === "assistant" && (
                        <div className="h-10 w-10 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                          <div className="bg-transparent">
                            <Bot className="h-5 w-5 text-cyan-400" />
                          </div>
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-xl p-4 ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25"
                            : "bg-slate-700/50 border border-slate-600/50 text-slate-100 backdrop-blur-sm"
                        }`}
                      >
                        <div className="text-sm leading-relaxed whitespace-pre-line">{message.content}</div>
                        <div className="text-xs opacity-70 mt-2">{message.timestamp}</div>
                      </div>
                      {message.role === "user" && (
                        <div className="h-10 w-10 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                          <div className="bg-transparent">
                            <User className="h-5 w-5 text-purple-400" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {isPlaying && messages.length > 1 && (
                    <div className="flex gap-3 justify-start">
                      <div className="h-10 w-10 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                        <div className="bg-transparent">
                          <Bot className="h-5 w-5 text-cyan-400" />
                        </div>
                      </div>
                      <div className="bg-slate-700/50 border border-slate-600/50 rounded-xl p-4 backdrop-blur-sm">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <div
                            className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input Area */}
                <div className="border-t border-slate-700/50 p-4">
                  <div className="flex gap-2">
                    <div className="flex-1 bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-2 text-slate-400 text-sm">
                      Ask about budgeting, savings, investments...
                    </div>
                    <button
                      size="sm"
                      disabled
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white opacity-50"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Indicators */}
            {isPlaying && (
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full p-3 shadow-lg shadow-cyan-500/25 animate-pulse">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold shadow-lg shadow-cyan-500/25 px-8 py-4 text-lg group"
          >
            Try Your AI Financial Advisor
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}
