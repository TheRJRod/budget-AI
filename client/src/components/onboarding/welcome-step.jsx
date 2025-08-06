


import { ArrowRight, Target, TrendingUp, Zap, Shield } from "lucide-react"
import { OnboardingFlow } from "./onboarding-flow"



export function WelcomeStep({ nextStep }) {
  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
          Welcome to Your Financial Future
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Let's set up your personalized financial dashboard in just a few steps. We'll help you track your income,
          manage expenses, and achieve your financial goals.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
         <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-cyan-500/30 backdrop-blur-sm p-6 rounded-lg">
          <div className="card-header">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-semibold leading-none tracking-tight text-white text-center">Track Income</div>
          </div>
          <div style={{paddingTop:24}} class="card-content">
            <div className="text-cyan-200 text-center">
              Connect all your income sources for a complete financial picture
            </div>
          </div>
        </div> 

         <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 border-purple-500/30 backdrop-blur-sm p-6 rounded-lg">
          <div className="card-header">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-semibold leading-none tracking-tight text-white text-center">Manage Expenses</div>
          </div>
          <div className="card-content">
            <div style={{paddingTop:24}} className="text-purple-200 text-center">
              Categorize and optimize your spending with AI-powered insights
            </div>
          </div>
        </div> 

         <div className="bg-gradient-to-br from-emerald-500/20 to-green-600/20 border-emerald-500/30 backdrop-blur-sm p-6 rounded-lg">
          <div className="card-header">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-semibold leading-none tracking-tight text-white text-center">Set Goals</div>
          </div>
          <div>
            <div style={{paddingTop:24}} className="text-emerald-200 text-center">
              Define your financial objectives and track progress automatically
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-center gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-400" />
            <span>Bank-level Security</span>
          </div>
          <div className="w-1 h-1 bg-slate-600 rounded-full" />
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-400" />
            <span>5-minute Setup</span>
          </div>
          <div className="w-1 h-1 bg-slate-600 rounded-full" />
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-purple-400" />
            <span>Personalized Insights</span>
          </div>
        </div>

        <button onClick={nextStep} class="ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-primary/90 h-11 rounded-md bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold shadow-lg shadow-cyan-500/25 px-8 py-4 text-lg group">Get Started<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg></button>
      </div>
    </div>
  )
}
