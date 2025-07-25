import { useState, useEffect } from "react"
import API from "../api"
import { useGoals } from "../context/GoalsContext"


const GoalProgressChart = () => {
 
  const {goals} = useGoals()

  

  return (
    <div className="goal-chart-container">
      <h2 className="goal-chart-title">Goal Progress</h2>
      <p className="goal-chart-subtitle">Your current savings progress toward each goal</p>
      {goals.map(goal => {
        const progress = goal.currentAmount / goal.targetAmount
        const percentage = Math.min(Math.round(progress * 100), 100)
        

        return (
          <div key={goal._id} className="goal-chart-item">
            <div className="goal-chart-header">
              <span className="goal-chart-name">{goal.title}</span>
              <div className="goal-chart-percentage">
                <span>{percentage}%</span>
              </div>
            </div>
            <div className="goal-chart-bar-bg">
              <div
                className="goal-chart-bar-fill bg-gradient-to-r from-purple-500 to-pink-500"
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
