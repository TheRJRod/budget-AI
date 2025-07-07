import { useState, useEffect } from "react"
import API from "../api"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts"
import {
  startOfWeek,
  format,
  getISOWeek,
  isSameMonth,
  subMonths,
  isWithinInterval,
  parseISO,
  isThisMonth,
  isLastDayOfMonth
} from "date-fns"

const FinancialChart = () => {
  const [chartData, setChartData] = useState([])
  const [filter, setFilter] = useState("thisMonth")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incomeRes, expensesRes] = await Promise.all([
          API.get("/income"),
          API.get("/expenses")
        ])

        const incomeData = incomeRes.data
        const expensesData = expensesRes.data

        const grouped = groupData(incomeData, expensesData, filter)
        setChartData(grouped)
      } catch (err) {
        console.error("Error loading financial data:", err)
      }
    }

    fetchData()
  }, [filter])

  const groupData = (income, expenses, filterType) => {
    const now = new Date()
    let filteredIncome = []
    let filteredExpenses = []

    switch (filterType) {
      case "thisMonth":
        filteredIncome = income.filter(i => isThisMonth(new Date(i.createdAt)))
        filteredExpenses = expenses.filter(e => isThisMonth(new Date(e.createdAt)))
        return groupByWeek(filteredIncome, filteredExpenses)

      case "lastMonth":
        const lastMonth = subMonths(now, 1)
        filteredIncome = income.filter(i => isSameMonth(new Date(i.createdAt), lastMonth))
        filteredExpenses = expenses.filter(e => isSameMonth(new Date(e.createdAt), lastMonth))
        return groupByWeek(filteredIncome, filteredExpenses)

      case "past4Weeks":
        const startDate = subMonths(now, 1)
        filteredIncome = income.filter(i => isWithinInterval(new Date(i.createdAt), { start: startDate, end: now }))
        filteredExpenses = expenses.filter(e => isWithinInterval(new Date(e.createdAt), { start: startDate, end: now }))
        return groupByWeek(filteredIncome, filteredExpenses)

      default:
        return []
    }
  }

  const groupByWeek = (income, expenses) => {
    const weeks = {}

    income.forEach(item => {
      const date = new Date(item.createdAt)
      const week = `Week ${getISOWeek(date)}`
      if (!weeks[week]) weeks[week] = { label: week, income: 0, expenses: 0 }
      weeks[week].income += item.total || 0
    })

    expenses.forEach(item => {
      const date = new Date(item.createdAt)
      const week = `Week ${getISOWeek(date)}`
      if (!weeks[week]) weeks[week] = { label: week, income: 0, expenses: 0 }
      weeks[week].expenses += item.total || 0
    })

    return Object.values(weeks).sort((a, b) => {
      const aWeek = parseInt(a.label.replace("Week ", ""))
      const bWeek = parseInt(b.label.replace("Week ", ""))
      return aWeek - bWeek
    })
  }

  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="range-select">Range: </label>
        <select
          id="range-select"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="thisMonth">This Month</option>
          <option value="lastMonth">Last Month</option>
          <option value="past4Weeks">Past 4 Weeks</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#00b894" />
          <Line type="monotone" dataKey="expenses" stroke="#d63031" />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}

export default FinancialChart
