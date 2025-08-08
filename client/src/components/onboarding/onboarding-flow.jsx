import { useState } from "react"
import { WelcomeStep } from "./welcome-step"
import { IncomeStep } from "./income-step"
import { ExpensesStep } from "./expenses-step"
import { GoalsStep } from "./goals-step"
import { CompletionStep } from "./completion-step"
import { TrendingUp, Sparkles } from "lucide-react"
import { useFinances } from "../../context/FinancesContext"
import { useGoals } from "../../context/GoalsContext"
import { useBudget } from "../../context/BudgetContext"

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState({
    income: { salary: 0, freelance: 0, investments: 0, other: 0 },
    expenses: { housing: 0, food: 0, transportation: 0, entertainment: 0, healthcare: 0, shopping: 0, other: 0 },
    goals: [],
  })

  const { postFinance } = useFinances();
  const { postGoals } = useGoals();
  const { postBudget } = useBudget();

  const steps = [
    { title: "Welcome", component: WelcomeStep },
    { title: "Income", component: IncomeStep },
    { title: "Expenses", component: ExpensesStep },
    { title: "Goals", component: GoalsStep },
    { title: "Complete", component: CompletionStep },
  ]

  const budgetInit = ["Entertainment", "Food", "Healthcare", "Housing", "Savings", "Shopping", "Transportation", "Other"]

  const progress = ((currentStep + 1) / steps.length) * 100

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateData = (stepData) => {
    setData((prev) => ({ ...prev, ...stepData }))
   
  }

  const setupDashboard = async () => {
  try {
    const incomePromises = Object.entries(data.income).map(([key, value]) => {
      if (value > 0) {
        const newIncome = {
          title: key.charAt(0).toUpperCase() + key.slice(1),
          type: "income",
          total: value,
          category: key,
          isRecurring: true,
          recurringType: "monthly",
          recurrenceDetails: { dayOfMonth: 1 },
        };
        return postFinance("/income", newIncome);
      }
      return null;
    });

    const expensePromises = Object.entries(data.expenses).map(([key, value]) => {
      if (value > 0) {
        const newExpense = {
          title: key.charAt(0).toUpperCase() + key.slice(1),
          type: "expense",
          total: value,
          category: key,
          isRecurring: true,
          recurringType: "monthly",
          recurrenceDetails: { dayOfMonth: 1 },
        };
        return postFinance("/expenses", newExpense);
      }
      return null;
    });

    const goalPromises = data.goals.map((goal) => {
      const newGoal = {
        title: goal.name,
        category: goal.category,
        targetAmount: goal.targetAmount,
        deadline: goal.deadline,
      };
      return postGoals(newGoal);
    });

    const budgetPromises = budgetInit.map((init) => {
      const newBudget = {
        title: init,
      targetAmount: 1000,
      currentAmount:0
      }
      return postBudget(newBudget)
    })

    

    // Await all promises in parallel
    await Promise.all([
      ...incomePromises.filter(Boolean),
      ...expensePromises.filter(Boolean),
      ...goalPromises,
      ...budgetPromises
    ]);

    console.log("Dashboard setup complete!");
    return true;
  } catch (error) {
    console.error("Error setting up dashboard", error);
  }
};


  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="p-6">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="relative">
                <TrendingUp className="h-8 w-8 text-cyan-400" />
                <div className="absolute inset-0 h-8 w-8 text-cyan-400 animate-pulse blur-sm" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  FinanceAI
                </h1>
                <p className="text-xs text-slate-400">Setup Wizard</p>
              </div>
              <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
            </div>

            {/* Progress */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-400">
                Step {currentStep + 1} of {steps.length}
              </span>
              <div className="w-32">
                {/* <Progress value={progress} className="h-2 bg-slate-700" /> */}
                <div
                  className="absolute inset-0 h-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-4xl">
            <CurrentStepComponent
              data={data}
              updateData={updateData}
              nextStep={nextStep}
              prevStep={prevStep}
              currentStep={currentStep}
              isFirstStep={currentStep === 0}
              isLastStep={currentStep === steps.length - 1}
              setupDashboard={setupDashboard}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
