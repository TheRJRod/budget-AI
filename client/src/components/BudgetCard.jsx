import { X } from "lucide-react";
import { useState } from "react";

const BudgetCard = ({ goal, handleChange }) => {
  const progress = goal.currentAmount / goal.targetAmount;
  const percentage = Math.min(Math.round(progress * 100), 100);
  const difference = (goal.targetAmount - goal.currentAmount)
    .toString()
    .replace("-", "");

  const categoryColor = (catTitle) => {
    switch (catTitle) {
      case "Food":
        return "bg-gradient-to-r from-blue-500 to-cyan-500";
      case "Entertainment":
        return "bg-gradient-to-r from-green-500 to-emerald-500";
      case "Savings":
        return "bg-gradient-to-r from-green-500 to-emerald-500";
      case "Healthcare":
        return "bg-gradient-to-r from-pink-500 to-rose-500";
      case "Transportation":
        return "bg-gradient-to-r from-yellow-500 to-orange-500";
      case "Subscriptions":
        return "bg-gradient-to-r from-red-500 to-red-600";
      case "Bill":
        return "bg-gradient-to-r from-red-500 to-red-600";
      case "undefined":
        return "bg-gradient-to-r from-red-500 to-red-600";
      case "Other":
        return "bg-gradient-to-r from-yellow-500 to-yellow-600";
    }
  };

  const [editMode, setEditMode] = useState(false);

  const toggleEdit = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <div className="inner-card bg-slate-700/30 border border-slate-600/50">
      <div className="top-card">
        <span style={{ fontWeight: 700, fontSize: 22 }}>{goal.title}</span>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 5,
          }}
        >
          <span style={{ fontWeight: "bold" }}>
            ${goal.currentAmount} / ${goal.targetAmount}
          </span>
          <span
            className={`${
              goal.targetAmount - goal.currentAmount < 0
                ? "text-red-400"
                : "text-emerald-400"
            }`}
          >
            ${`${difference}`}
            {goal.targetAmount - goal.currentAmount < 0 ? " over" : " left"}
          </span>
        </div>
      </div>

      <div className="middle-card">
        <div className="goal-chart-bar-bg">
          <div
            className={`goal-chart-bar-fill ${categoryColor(goal.title)}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <div className="goal-chart-percentage">
          <span className="text-slate-300" style={{ marginTop: 10 }}>
            {percentage}% used
          </span>
          <div
            style={{ marginTop: 10, marginBottom: 0 }}
            className="edit-container form-row"
          >
            {editMode && <input onChange={(e) => handleChange(e, goal.title)} type="number" style={{ padding: 7 }} value={goal.targetAmount} />}
            <button
              onClick={toggleEdit}
              variant="outline"
              size="sm"
              className="ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-9 rounded-md px-3 bg-slate-700/50 border-slate-600 text-slate-400 hover:bg-blue-500/20 hover:border-blue-500/50 hover:text-blue-400"
            >
              {editMode ? "Save target amount" : "Edit target amount"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;
