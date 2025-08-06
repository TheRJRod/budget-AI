import { useState } from "react";
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import API from "../api";

const GoalCard = ({ goal, refreshGoals, index }) => {
    const [contribution, setContribution] = useState(null);

    const progress =
    goal.targetAmount && goal.targetAmount > 0
        ? goal.currentAmount / goal.targetAmount
        : 0;

    const percentage = Math.min(Math.round(progress * 100), 100);
    

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
        if(contribution === null || contribution == 0) {
            alert("Must add value more than 0")
            return;
        }
        try {
            await API.patch(`/goals/${goal._id}/contribute`, { amount: contribution });
            refreshGoals(); // Let the parent refetch goals after updating
            setContribution(0); // Reset contribution after submit
        } catch (error) {
            console.error("Error contributing to goal:", error);
        }
    };

    return (
        <div className={`inner-card shadow-2xs bg-gradient-to-br  backdrop-blur-xl 
            ${index % 3 === 0
            ? "from-blue-500/30 to-cyan-500/30 border-blue-500/50"
            : index % 3 === 1
            ? "from-red-500/30 to-orange-500/30 border-red-500/50"
            : "from-purple-500/30 to-pink-500/30 border-purple-500/50"}`}>
            <div className="top-card">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <span style={{ fontWeight: 700, fontSize: 24, color:'white' }}>{goal.title}</span>
                    <span className="text-slate-400">{formatted}</span>
                </div>
                <span style={{ fontWeight: 700, fontSize:14, borderRadius: 20, padding: '4px 8px', border: '1px solid rgb(228 228 231)', backgroundColor: "rgb(30 41 59 / 0.5)", color:"white" }}>{goal.category}</span>
            </div>

            <div className="middle-card">
                <div className="goal-chart-header">
                    <span className="goal-chart-name">Progress</span>
                    <div className="goal-chart-percentage">
                        <span>{percentage}%</span>
                       
                    </div>
                </div>
                <div className="goal-chart-bar-bg">
                    <div className="goal-chart-bar-fill bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-80 transition-all duration-500" style={{ width: `${percentage}%` }}></div>
                </div>
                <div className="goal-amounts">
                    <span>${goal.currentAmount}</span>
                    <span>${goal.targetAmount}</span>
                </div>
            </div>

            <div className="bottom-card">
                <div style={{fontWeight:'bold', color:'white'}}>${goal.targetAmount - goal.currentAmount} remaining</div>
                <form onSubmit={handleSubmit}>
                    <button className="goal-quick-add ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-9 rounded-md px-3 bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600/50 hover:text-white" type="button" onClick={() => handleQuickAdd(100)}>$100</button>
                    <button className="goal-quick-add ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-9 rounded-md px-3 bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600/50 hover:text-white" type="button" onClick={() => handleQuickAdd(500)}>$500</button>
                    <input placeholder="$0" className="ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-9 rounded-md px-3 bg-slate-700/50 border-slate-600 text-slate-200 hover:bg-slate-600/50 hover:text-white" type="number" value={contribution} onChange={handleInputChange} />
                    <button className="ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary/90 h-10 px-4 py-2  bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/25" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default GoalCard;
