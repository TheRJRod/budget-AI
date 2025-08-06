
import { useState } from "react"
import { ArrowRight, ArrowLeft, Target, Plus, X, Calendar, DollarSign } from "lucide-react"




export function GoalsStep({ data, updateData, nextStep, prevStep }) {
  const [goals, setGoals] = useState(data.goals)
  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: "",
    deadline: "",
    category: "",
    priority: "medium" ,
  })

  const addGoal = () => {
    if (newGoal.name && newGoal.targetAmount && newGoal.deadline && newGoal.category) {
      const goal = {
        name: newGoal.name,
        targetAmount: Number.parseFloat(newGoal.targetAmount),
        deadline: newGoal.deadline,
        category: newGoal.category,
      }
      const updatedGoals = [...goals, goal]
      setGoals(updatedGoals)
      updateData({ goals: updatedGoals })
      setNewGoal({
        name: "",
        targetAmount: "",
        deadline: "",
        category: "",
      })
    }
  }

  const removeGoal = (index) => {
    const updatedGoals = goals.filter((_, i) => i !== index)
    setGoals(updatedGoals)
    updateData({ goals: updatedGoals })
  }

  const totalIncome = Object.values(data.income).reduce((sum, value) => sum + value, 0)
  const totalExpenses = Object.values(data.expenses).reduce((sum, value) => sum + value, 0)
  const monthlySavings = totalIncome - totalExpenses




  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
          Set Your Financial Goals
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Define what you're saving for. We'll help you track progress and suggest optimal saving strategies.
        </p>
      </div>

      {/* Add New Goal */}
      <div className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl rounded-lg">
        <div className="p-6">
          <div className="text-white flex items-center gap-2">
            <Plus className="h-5 w-5 text-cyan-400" />
            Add Financial Goal
          </div>
          <div className="text-slate-400">Create a new savings target</div>
        </div>
        <div className="space-y-4 p-6 pt-0">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="goalName" className="text-slate-300">
                Goal Name
              </label>
              <input
                id="goalName"
                placeholder="e.g., Emergency Fund"
                value={newGoal.name}
                onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/25"
              />
            </div>
            <div>
              <label htmlFor="targetAmount" className="text-slate-300">
                Target Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="targetAmount"
                  type="number"
                  placeholder="10,000"
                  value={newGoal.targetAmount}
                  onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/25"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="deadline" className="text-slate-300">
                Target Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  id="deadline"
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 bg-slate-700/50 border-slate-600 text-white focus:border-cyan-500/50 focus:ring-cyan-500/25"
                />
              </div>
            </div>
            <div>
              <label htmlFor="category" className="text-slate-300">
                Category
              </label>
              <input value={newGoal.category} onChange={(e) => setNewGoal({...newGoal, category:e.target.value})} className="flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/25" placeholder="Category" />
            </div>
            
          </div>

          <button
            onClick={addGoal}
            disabled={!newGoal.name || !newGoal.targetAmount || !newGoal.deadline || !newGoal.category}
            className="ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary/90 h-10 px-4 py-2 w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold shadow-lg shadow-cyan-500/25"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Goal
          </button>
        </div>
      </div>

      {/* Goals List */}
      {goals.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white">Your Financial Goals</h3>
          <div className="grid gap-4">
            {goals.map((goal, index) => {
              const monthsToGoal = Math.ceil(
                (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30),
              )
              const monthlyRequired = monthsToGoal > 0 ? goal.targetAmount / monthsToGoal : goal.targetAmount

              return (
                <div key={index} className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl rounded-lg">
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Target className="h-5 w-5 text-cyan-400" />
                          <h4 className="font-semibold text-white">{goal.name}</h4>
                          <div variant="outline" className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-slate-700/50 text-slate-300 border-slate-600">
                            {goal.category}
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-slate-400">Target:</span>
                            <div className="font-semibold text-white">${goal.targetAmount.toLocaleString()}</div>
                          </div>
                          <div>
                            <span className="text-slate-400">Deadline:</span>
                            <div className="font-semibold text-white">{goal.deadline}</div>
                          </div>
                          <div>
                            <span className="text-slate-400">Monthly needed:</span>
                            <div
                              className={`font-semibold ${monthlyRequired > monthlySavings ? "text-red-400" : "text-green-400"}`}
                            >
                              ${monthlyRequired.toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeGoal(index)}
                        variant="outline"
                        size="sm"
                        className="ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-9 rounded-md px-3 bg-slate-700/50 border-slate-600 text-slate-400 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Savings Analysis */}
      {monthlySavings > 0 && goals.length > 0 && (
        <div className="bg-gradient-to-r from-emerald-500/20 to-green-600/20 border-emerald-500/30 backdrop-blur-sm rounded-lg">
          <div className="p-6">
            <div className="text-white">Savings Analysis</div>
            <div className="text-emerald-200">Based on your income and expenses</div>
          </div>
          <div className="p-6 pt-0">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-2xl font-bold text-white mb-2">${monthlySavings.toLocaleString()}</div>
                <p className="text-emerald-200">Available monthly savings</p>
              </div>
              <div>
                <div className="text-lg font-semibold text-white mb-2">
                  $
                  {goals
                    .reduce((sum, goal) => {
                      const months = Math.ceil(
                        (new Date(goal.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30),
                      )
                      return sum + (months > 0 ? goal.targetAmount / months : goal.targetAmount)
                    }, 0)
                    .toLocaleString()}
                </div>
                <p className="text-emerald-200">Required monthly savings for all goals</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          variant="outline"
          className="ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-10 px-4 py-2 bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-600/50 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </button>
        <button
          onClick={nextStep}
          className="ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary/90 h-10 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold shadow-lg shadow-emerald-500/25 group"
        >
          Complete Setup
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}
