"use client"

import { useState } from "react"
import {
  ArrowRight,
  ArrowLeft,
  DollarSign,
  Home,
  Utensils,
  Car,
  Gamepad2,
  Heart,
  ShoppingBag,
  MoreHorizontal,
  DollarSignIcon
} from "lucide-react"
import { OnboardingFlow } from "./onboarding-flow"



export function ExpensesStep({ data, updateData, nextStep, prevStep }) {
  const [expenses, setExpenses] = useState(data.expenses)

  const handleInputChange = (field, value) => {
    const numValue = Number.parseFloat(value) || 0
    const newExpenses = { ...expenses, [field]: numValue }
    setExpenses(newExpenses)
    updateData({ expenses: newExpenses })
  }

  const totalExpenses = Object.values(expenses).reduce((sum, value) => sum + value, 0)
  const totalIncome = Object.values(data.income).reduce((sum, value) => sum + value, 0)
  const remainingBudget = totalIncome - totalExpenses
  const budgetPercentage = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0

  const expenseFields = [
    {
      key: "housing",
      label: "Housing",
      placeholder: "1,200",
      icon: Home,
      description: "Rent, mortgage, utilities, insurance",
      color: "from-blue-500 to-cyan-500",
    },
    {
      key: "food",
      label: "Food & Dining",
      placeholder: "600",
      icon: Utensils,
      description: "Groceries, restaurants, meal delivery",
      color: "from-red-500 to-purple-500",
    },
    {
      key: "transportation",
      label: "Transportation",
      placeholder: "300",
      icon: Car,
      description: "Gas, public transit, car payments",
      color: "from-yellow-500 to-orange-500",
    },
    {
      key: "entertainment",
      label: "Entertainment",
      placeholder: "200",
      icon: Gamepad2,
      description: "Movies, subscriptions, hobbies",
      color: "from-purple-500 to-pink-500",
    },
    {
      key: "healthcare",
      label: "Healthcare",
      placeholder: "150",
      icon: Heart,
      description: "Medical, dental, prescriptions",
      color: "from-red-500 to-pink-500",
    },
    {
      key: "savings",
      label: "Savings",
      placeholder: "300",
      icon: DollarSignIcon,
      description: "Savings, retirement",
      color: "from-green-500 to-emerald-500",
    },
    {
      key: "shopping",
      label: "Shopping",
      placeholder: "300",
      icon: ShoppingBag,
      description: "Clothing, electronics, personal items",
      color: "from-indigo-500 to-purple-500",
    },
    {
      key: "other",
      label: "Other Expenses",
      placeholder: "200",
      icon: MoreHorizontal,
      description: "Miscellaneous and unexpected costs",
      color: "from-slate-500 to-slate-600",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
          Now Your Monthly Expenses
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Break down your typical monthly spending. This helps us create accurate budget recommendations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {expenseFields.map((field) => {
          const Icon = field.icon
          return (
            <div key={field.key} className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl rounded-lg">
              <div className="pb-3 p-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 bg-gradient-to-r ${field.color} rounded-lg flex items-center justify-center`}
                  >
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-white text-sm">{field.label}</div>
                  </div>
                </div>
                <div className="text-xs text-slate-400 pt-2" >{field.description}</div>
              </div>
              <div className="pt-0 p-6">
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    id={field.key}
                    type="number"
                    placeholder={field.placeholder}
                    value={expenses[field.key] || ""}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    className="flex w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-purple-500/50 focus:ring-purple-500/25 h-10"
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Budget Summary */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl rounded-lg">
          <div className="p-6">
            <div className="text-2xl font-semibold leading-none tracking-tight text-white">Expense Summary</div>
            <div className="text-slate-400">Your monthly spending breakdown</div>
          </div>
          <div className="space-y-4 p-6 pt-0">
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Total Expenses</span>
              <span className="text-xl font-bold text-white">${totalExpenses.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300">Total Income</span>
              <span className="text-lg font-semibold text-cyan-400">${totalIncome.toLocaleString()}</span>
            </div>
            <div className="border-t border-slate-600 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Remaining Budget</span>
                <span className={`text-xl font-bold ${remainingBudget >= 0 ? "text-green-400" : "text-red-400"}`}>
                  ${remainingBudget.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`backdrop-blur-xl rounded-lg ${budgetPercentage > 100 ? "bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500/30" : budgetPercentage > 80 ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30" : "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30"}`}
        >
          <div className="p-6">
            <div className="text-2xl font-semibold leading-none tracking-tight text-white">Budget Health</div>
            <div
              className={
                budgetPercentage > 100 ? "text-red-200" : budgetPercentage > 80 ? "text-yellow-200" : "text-green-200"
              }
            >
              {budgetPercentage > 100
                ? "You're spending more than you earn"
                : budgetPercentage > 80
                  ? "You're using most of your income"
                  : "Great! You have room for savings"}
            </div>
          </div>
          <div className="space-y-4 p-6 pt-0">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-200">Budget Usage</span>
                <span className="text-white font-semibold">{Math.round(budgetPercentage)}%</span>
              </div>
              {/* <Progress value={Math.min(budgetPercentage, 100)} className="h-3 bg-slate-700/50" /> */}
            </div>
            <div className="text-sm text-slate-200">
              {budgetPercentage <= 50 && "Excellent! Consider increasing your savings rate."}
              {budgetPercentage > 50 && budgetPercentage <= 80 && "Good balance between spending and saving."}
              {budgetPercentage > 80 && budgetPercentage <= 100 && "Consider reducing some expenses."}
              {budgetPercentage > 100 && "Review your expenses to avoid debt."}
            </div>
          </div>
        </div>
      </div>

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
          className="ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary/90 h-10 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold shadow-lg shadow-purple-500/25 group"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}
