import { useState } from "react";
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import API from "../api";

const GoalCard = ({ goal, refreshGoals }) => {
    const [contribution, setContribution] = useState(0);

    const progress = goal.currentAmount / goal.targetAmount;
    const percentage = Math.min(Math.round(progress * 100), 100);
    const rising = Math.random() > 0.5; // Placeholder

   const date = goal.deadline ? new Date(goal.deadline) : null;
let formatted = "";

if (!date || isNaN(date.getTime())) {
    formatted = "No deadline";
} else {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    formatted = date < today
        ? "Overdue"
        : new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
          }).format(date);
}


    const handleQuickAdd = (amount) => {
        setContribution(amount);
    };

    const handleInputChange = (e) => {
        setContribution(Number(e.target.value || 0));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.patch(`/goals/${goal._id}/contribute`, { amount: contribution });
            refreshGoals(); // Let the parent refetch goals after updating
            setContribution(0); // Reset contribution after submit
        } catch (error) {
            console.error("Error contributing to goal:", error);
        }
    };

    return (
        <div className="inner-card">
            <div className="top-card">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <span style={{ fontWeight: 700, fontSize: 22 }}>{goal.title}</span>
                    <span>{formatted}</span>
                </div>
                <span style={{ fontWeight: 700, borderRadius: 20, padding: '4px 8px', border: '1px solid rgb(228 228 231)' }}>{goal.category}</span>
            </div>

            <div className="middle-card">
                <div className="goal-chart-header">
                    <span className="goal-chart-name">Progress</span>
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
                    <div className="goal-chart-bar-fill" style={{ width: `${percentage}%` }}></div>
                </div>
                <div className="goal-amounts">
                    <span>${goal.currentAmount}</span>
                    <span>${goal.targetAmount}</span>
                </div>
            </div>

            <div className="bottom-card">
                <div style={{fontWeight:'bold'}}>${goal.targetAmount - goal.currentAmount} remaining</div>
                <form onSubmit={handleSubmit}>
                    <button className="goal-quick-add" type="button" onClick={() => handleQuickAdd(100)}>$100</button>
                    <button className="goal-quick-add" type="button" onClick={() => handleQuickAdd(500)}>$500</button>
                    <input type="number" value={contribution} onChange={handleInputChange} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default GoalCard;
