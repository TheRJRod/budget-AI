import GoalProgressChart from "../components/GoalChart";
import UpcomingBills from "../components/UpcomingBills";
import DashboardCard from "../components/dashboardCard";
import FinancialChart from "../components/FinancialChart";
import API from "../api";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [income, setIncome] = useState([])
  const [expenses, setExpenses] = useState([])

  useEffect(() => {
    const fetchIncome = async () => {
      const res = await API.get('/income')
      setIncome(res.data)
    }

    const fetchExpenses = async () => {
      const res = await API.get('/expenses')
      setExpenses(res.data)
    }

    fetchIncome()
    fetchExpenses()
  }, [])

  return (
    <>
    <div className="inner-wrap">
    <div className="top-wrap">
      <div className="cards-container">
      <DashboardCard heading="Income" data={income} link="/finances" classes="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 backdrop-blur-sm" />
      <DashboardCard heading="Expenses" data={expenses} link="/finances" classes="bg-gradient-to-br from-red-500/20 to-pink-600/20 border-red-500/30 backdrop-blur-sm" />
      <div className="bills-container bg-gradient-to-br from-purple-500/20 to-pink-600/20 border-purple-500/30 backdrop-blur-sm">
        <UpcomingBills />
      </div>
      </div>
    </div>
    <div className="bottom-wrap">
      <div className="chart-container shadow-2xs bg-slate-800/50 border-slate-700/50 backdrop-blur-xl">
      <FinancialChart />
      </div>
      
      <a href="/goals" className="goals-container bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-cyan-500/30 backdrop-blur-sm">
        <GoalProgressChart/>
      </a>
    </div>
      </div>
    </>
  );
}
