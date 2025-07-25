import { useState, useEffect } from "react";
import API from "../api";
import { useGoals } from "../context/GoalsContext";

const GoalProgressChart = () => {
  const { goals } = useGoals();

  return (
    <div className="goal-chart-container">
      <h2
        style={{ display: "flex", gap: 10, alignItems: "center" }}
        className="goal-chart-title"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-target h-5 w-5 text-purple-400"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="6"></circle>
          <circle cx="12" cy="12" r="2"></circle>
        </svg>{" "}
        Goal Progress
      </h2>
      <p className="goal-chart-subtitle text-sm text-slate-400">
        Your current savings progress toward each goal
      </p>
      {goals.map((goal) => {
        const progress = goal.currentAmount / goal.targetAmount;
        const percentage = Math.min(Math.round(progress * 100), 100);

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
        );
      })}
    </div>
  );
};

export default GoalProgressChart;
