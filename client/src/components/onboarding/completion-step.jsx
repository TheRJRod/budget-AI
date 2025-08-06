import { useState } from "react"
import { CheckCircle, TrendingUp, Target, DollarSign, Sparkles, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"


export function CompletionStep({ data, setupDashboard }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)

  const totalIncome = Object.values(data.income).reduce((sum, value) => sum + value, 0)
  const totalExpenses = Object.values(data.expenses).reduce((sum, value) => sum + value, 0)
  const monthlySavings = totalIncome - totalExpenses
  const totalGoals = data.goals.reduce((sum, goal) => sum + goal.targetAmount, 0)

  const goToDashboard = async () => {
  try {
    setIsLoading(true);
    await setupDashboard();  
    navigate("/dashboard"); 
  } catch (error) {
    console.error("Failed to complete setup", error);
    
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <div className="relative mx-auto w-20 h-20">
          <CheckCircle className="w-20 h-20 text-green-400" />
          <div className="absolute inset-0 w-20 h-20 text-green-400 animate-pulse blur-sm" />
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
          Setup Complete!
        </h2>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Your personalized financial dashboard is ready. We've analyzed your data and prepared custom insights just for
          you.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-cyan-500/30 backdrop-blur-sm rounded-lg">
          <div className="p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-semibold leading-none tracking-tight text-white text-center">Monthly Income</div>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold text-white text-center">${totalIncome.toLocaleString()}</div>
            <div className="text-cyan-200 text-center">
              {Object.entries(data.income)
                .filter(([, value]) => value > 0)
                .map(([key]) => key)
                .join(", ")}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 border-purple-500/30 backdrop-blur-sm rounded-lg">
          <div className="p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-semibold leading-none tracking-tight text-white text-center">Monthly Savings</div>
          </div>
          <div className="p-6 pt-0">
            <div className={`text-2xl font-bold text-center ${monthlySavings >= 0 ? "text-white" : "text-red-400"}`}>
              ${monthlySavings.toLocaleString()}
            </div>
            <div className="text-purple-200 text-center">
              {monthlySavings >= 0 ? "Available for goals" : "Budget needs adjustment"}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/20 to-green-600/20 border-emerald-500/30 backdrop-blur-sm rounded-lg">
          <div className="p-6">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-semibold leading-none tracking-tight text-white text-center">Financial Goals</div>
          </div>
          <div className="p-6 pt-0" >
            <div className="text-2xl font-bold text-white text-center">{data.goals.length}</div>
            <div className="text-emerald-200 text-center">
              ${totalGoals.toLocaleString()} total target
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights Preview */}
      <div className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl max-w-3xl mx-auto rounded-lg">
        <div className="p-6">
          <div className="text-2xl font-semibold leading-none tracking-tight text-white flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-400" />
            AI Insights Ready
          </div>
          <div className="text-slate-400">
            Your personalized financial recommendations are being prepared
          </div>
        </div>
        <div className="space-y-4 p-6 pt-0">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-green-100">Budget Analysis</span>
              </div>
              <p className="text-xs text-green-200">
                {monthlySavings >= 0
                  ? `Great! You have $${monthlySavings.toLocaleString()} monthly surplus`
                  : "We'll help optimize your spending"}
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-blue-500/20 to-cyan-600/20 border border-blue-500/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-100">Goal Tracking</span>
              </div>
              <p className="text-xs text-blue-200">
                {data.goals.length > 0
                  ? `${data.goals.length} goals set up for automatic tracking`
                  : "Ready to add goals anytime"}
              </p>
            </div>
          </div>
          <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-600/20 border border-purple-500/30 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-100">Smart Recommendations</span>
            </div>
            <p className="text-xs text-purple-200">
              AI-powered insights will help you optimize spending and reach your goals faster
            </p>
          </div>
        </div>
      </div>

      {/* Launch Dashboard Button */}
      <div className="space-y-4">
        <button
          onClick={goToDashboard}
          disabled={isLoading}
          size="lg"
          className="rounded-md bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold shadow-lg shadow-cyan-500/25 px-8 py-4 text-lg group"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Preparing Dashboard...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              Launch Dashboard
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </div>
          )}
        </button>
        <p className="text-sm text-slate-400">You can always update your information later in the dashboard settings</p>
      </div>
    </div>
  )
}
