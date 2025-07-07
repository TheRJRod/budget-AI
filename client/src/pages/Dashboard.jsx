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
    
    <div className="left-wrap">
      <div className="cards-container">
      <DashboardCard heading="Income" data={income} link="/finances" />
      <DashboardCard heading="Expenses" data={expenses} link="/finances" />
      </div>
      <div className="chart-container">
      <FinancialChart />
      </div>
    </div>
    <div className="right-wrap">
      <div className="bills-container">
        <UpcomingBills />
      </div>
      <div className="goals-container">
        <GoalProgressChart/>
      </div>
    </div>
      
    </>
  );
}
