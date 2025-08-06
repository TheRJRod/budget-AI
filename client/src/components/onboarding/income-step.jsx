import { useState } from "react"
import { ArrowRight, ArrowLeft, DollarSign, Briefcase, TrendingUp, PiggyBank } from "lucide-react"




export function IncomeStep({ data, updateData, nextStep, prevStep }) {
  const [income, setIncome] = useState(data.income)

  const handleInputChange = (field, value) => {
    const numValue = Number.parseFloat(value) || 0
    const newIncome = { ...income, [field]: numValue }
    setIncome(newIncome)
    updateData({ income: newIncome })
    
  }

  const totalIncome = Object.values(income).reduce((sum, value) => sum + value, 0)

  const incomeFields = [
    {
      key: "salary" ,
      label: "Salary/Wages",
      placeholder: "5,000",
      icon: Briefcase,
      description: "Your primary employment income",
      color: "from-blue-500 to-cyan-500",
    },
    {
      key: "freelance",
      label: "Freelance/Side Hustle",
      placeholder: "1,500",
      icon: TrendingUp,
      description: "Income from freelance work or side projects",
      color: "from-purple-500 to-pink-500",
    },
    {
      key: "investments",
      label: "Investments",
      placeholder: "800",
      icon: PiggyBank,
      description: "Dividends, interest, and investment returns",
      color: "from-emerald-500 to-green-500",
    },
    {
      key: "other",
      label: "Other Income",
      placeholder: "300",
      icon: DollarSign,
      description: "Rental income, benefits, or other sources",
      color: "from-yellow-500 to-orange-500",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
          Let's Start with Your Income
        </h2>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Tell us about your monthly income sources. Don't worry, you can always adjust these later.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {incomeFields.map((field) => {
          const Icon = field.icon
          return (
            <div key={field.key} className="bg-slate-800/50 border-slate-700/50 backdrop-blur-xl rounded-lg ">
              <div className="p-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 bg-gradient-to-r ${field.color} rounded-lg flex items-center justify-center`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold tracking-tight text-white text-lg">{field.label}</div>
                    <div className="text-slate-400">{field.description}</div>
                  </div>
                </div>
              </div>
              <div className="p-6 pt-0">
                <div className="space-y-2">
                   <label htmlFor={field.key} className="text-slate-300">
                    Monthly Amount
                  </label> *
                  <div className="relative mt-2">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                     <input
                      id={field.key}
                      type="number"
                      placeholder={field.placeholder}
                      value={income[field.key] || ""}
                      onChange={(e) => handleInputChange(field.key, e.target.value)}
                      className="flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-cyan-500/50 focus:ring-cyan-500/25"
                    /> 
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Total Income Summary */}
      <div className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-cyan-500/30 backdrop-blur-sm rounded-lg">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Total Monthly Income</h3>
              <p className="text-cyan-200">This will be used to calculate your budget recommendations</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-white">${totalIncome.toLocaleString()}</div>
              <p className="text-sm text-cyan-200">${(totalIncome * 12).toLocaleString()} annually</p>
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
          disabled={totalIncome === 0}
          className="ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary/90 h-10 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold shadow-lg shadow-cyan-500/25 group"
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}
