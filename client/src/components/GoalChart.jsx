import { useState, useEffect } from "react"
import API from "../api"
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

const GoalProgressChart = () => {
  const [goals, setGoals] = useState([])

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await API.get("/goals")
        setGoals(res.data)
      } catch (error) {
        console.error("Error fetching goals:", error)
      }
    }

    fetchGoals()
  }, [])

  return (
    <div className="goal-chart-container">
      <h2 className="goal-chart-title">Goal Progress</h2>
      <p className="goal-chart-subtitle">Your current savings progress toward each goal</p>
      {goals.map(goal => {
        const progress = goal.currentAmount / goal.targetAmount
        const percentage = Math.min(Math.round(progress * 100), 100)
        const rising = Math.random() > 0.5 // Placeholder for trend direction

        return (
          <div key={goal._id} className="goal-chart-item">
            <div className="goal-chart-header">
              <span className="goal-chart-name">{goal.title}</span>
              <div className="goal-chart-percentage">
                <span>{percentage}%</span>
                {rising ? (
                  <ArrowUpRight className="goal-chart-arrow goal-chart-arrow-up" />
                ) : (
                  <ArrowDownRight className="goal-chart-arrow goal-chart-arrow-down" />
                )}
              </div>
            </div>
            <div className="goal-chart-bar-bg">
              <div
                className="goal-chart-bar-fill"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default GoalProgressChart
