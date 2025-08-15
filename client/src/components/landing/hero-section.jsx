import { useState, useEffect } from "react"
import { TrendingUp, Sparkles, ArrowRight, Play, Star, Zap } from "lucide-react"


export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-20 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <TrendingUp className="h-8 w-8 text-cyan-400" />
              <div className="absolute inset-0 h-8 w-8 text-cyan-400 animate-pulse blur-sm" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                FinanceAI
              </h1>
              <p className="text-xs text-slate-400">Future Finance</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="/auth">
              <button variant="outline" className="ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent border h-10 px-4 py-2 bg-slate-800/50 border-slate-600 text-slate-300 hover:text-white">
                Sign In
              </button>
            </a>
            <a href="/auth">
              <button className="ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary/90 h-10 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white">
                Get Started
              </button>
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto text-center space-y-8">
        {/* Badge */}
        <div
          className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="inline-flex items-center rounded-full border text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-primary/80 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/30 text-cyan-300 px-4 py-2">
            <Sparkles className="h-4 w-4 mr-2" />
            AI-Powered Financial Intelligence
          </div>
        </div>

        {/* Main Headline */}
        <div
          className={`space-y-6 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
              Master Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Financial Future
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Transform your relationship with money using AI-powered insights, intelligent budgeting, and personalized
            recommendations that adapt to your lifestyle.
          </p>
        </div>

        {/* CTA Buttons */}
        <div
          className={`flex sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <a href="/auth">
            <button
              size="lg"
              className="ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary/90 h-11 rounded-md bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold shadow-lg shadow-cyan-500/25 px-8 py-4 text-lg group"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </a>
          <button
            size="lg"
            variant="outline"
            className="ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent border h-11 rounded-md bg-slate-800/50 border-slate-600 text-slate-300 hover:text-white px-8 py-4 text-lg group"
          >
            <Play className="mr-2 h-5 w-5" />
            Watch Demo
          </button>
        </div>

        {/* Social Proof */}
        <div
          className={`flex items-center justify-center gap-8 text-slate-400 transition-all duration-1000 delay-600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-sm">4.9/5 from 2,000+ users</span>
          </div>
          <div className="w-1 h-1 bg-slate-600 rounded-full" />
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-green-400" />
            <span className="text-sm">Setup in under 5 minutes</span>
          </div>
        </div>

        {/* Hero Visual */}
        <div
          className={`relative mt-16 transition-all duration-1000 delay-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="relative mx-auto max-w-4xl">
            {/* Dashboard Preview */}
            <div className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-400 rounded-full" />
                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                <div className="w-3 h-3 bg-green-400 rounded-full" />
              </div>

              {/* Mock Dashboard Content */}
              <div className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30 rounded-lg p-4">
                    <div className="text-emerald-400 text-sm">Monthly Income</div>
                    <div className="text-white text-2xl font-bold">$5,500</div>
                  </div>
                  <div className="bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 rounded-lg p-4">
                    <div className="text-red-400 text-sm">Expenses</div>
                    <div className="text-white text-2xl font-bold">$3,200</div>
                  </div>
                  <div className="bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 border border-cyan-500/30 rounded-lg p-4">
                    <div className="text-cyan-400 text-sm">Savings</div>
                    <div className="text-white text-2xl font-bold">$2,300</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-lg p-4">
                    <div className="text-purple-400 text-sm">Goals</div>
                    <div className="text-white text-2xl font-bold">65%</div>
                  </div>
                </div>

                <div className="bg-slate-700/30 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-yellow-400" />
                    <span className="text-white font-medium">AI Recommendation</span>
                  </div>
                  <p className="text-slate-300 text-sm">
                    You're on track to reach your emergency fund goal 2 months early! Consider increasing your vacation
                    savings by $200/month.
                  </p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full p-3 shadow-lg shadow-cyan-500/25 animate-bounce">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div
              className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3 shadow-lg shadow-purple-500/25 animate-bounce"
              style={{ animationDelay: "0.5s" }}
            >
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
