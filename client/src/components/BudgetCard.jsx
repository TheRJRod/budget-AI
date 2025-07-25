
const BudgetCard = ({ goal }) => {

    const progress = goal.currentAmount / goal.targetAmount;
    const percentage = Math.min(Math.round(progress * 100), 100);
    const difference = (goal.targetAmount - goal.currentAmount).toString().replace("-","");

    const categoryColor = (catTitle) => {
        switch(catTitle) {
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
                return "bg-gradient-to-r from-yellow-500 to-yellow-600"
        }
    }



    return (
        
        <div className="inner-card bg-slate-700/30 border border-slate-600/50">
            <div className="top-card">
                    <span style={{ fontWeight: 700, fontSize: 22 }}>{goal.title}</span>
                    <div style={{display:"flex", flexDirection:'column', alignItems:'flex-end', gap:5}}>
                    <span style={{fontWeight:'bold'}}>${goal.currentAmount} / ${goal.targetAmount}</span>
                    <span className={`${goal.targetAmount - goal.currentAmount < 0 ? "text-red-400" : "text-emerald-400"}`}>${`${difference}`}{goal.targetAmount - goal.currentAmount < 0 ? " over" : " left"}</span>
                    </div>
            </div>

            <div className="middle-card">
                <div className="goal-chart-bar-bg">
                    <div className={`goal-chart-bar-fill ${categoryColor(goal.title)}`} style={{ width: `${percentage}%` }}></div>
                </div>
                <div className="goal-chart-percentage">
                        <span className="text-slate-300" style={{marginTop:10}}>{percentage}% used</span>
                    </div>
                
            </div>

        </div>
    );
};

export default BudgetCard;
