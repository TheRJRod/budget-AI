import { useState, useEffect } from "react";
import API from "../api";
import GoalCard from "../components/GoalsCard";
import { useGoals } from "../context/GoalsContext";

const GoalsPage = () => {
    const [form, setForm] = useState({title:"", targetAmount:"", deadline:"", category:""})
    const {goals,loading, refreshGoals, postGoals} = useGoals()



    const handlePostSubmit = (e) => {
        e.preventDefault();
        postGoals(form)
    };


    const handlePostChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

  

    if (loading) return <p>Loading Goals...</p>;

    return (
        <>
        <div className="inner-wrap">
            <div className="inner-card shadow-2xs bg-slate-800/50 border-slate-700/50 backdrop-blur-xl">
                <h2 style={{fontSize:24, color:'white', fontWeight:'bold' }}>Create New Goal</h2>
                <p style={{fontSize:14}} className="text-slate-400">Set a new savings target to work towards</p>
                <form style={{marginTop:24}} onSubmit={handlePostSubmit}>
                    <div className="form-row">
                        <label>
                            Goal Name
                            <input name="title" placeholder="e.g., Emergency Fund" onChange={handlePostChange}/>
                        </label>
                        <label>
                            Target Amount
                            <input name="targetAmount" type="number" placeholder="0.00" onChange={handlePostChange}/>
                        </label>
                    </div>
                    <div className="form-row">
                        <label>
                            Deadline
                            <input type="date" name="deadline" onChange={handlePostChange}/>
                        </label>
                        <label>
                            Category
                            <input placeholder="e.g, Emergency, Travel" name="category" onChange={handlePostChange}/>
                        </label>
                    </div>
                    <div className="form-row">
                <button className="ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary/90 h-10 px-4 py-2 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold shadow-lg shadow-purple-500/25" type="submit">Submit Goal</button>
                </div>
                </form>
            </div>
           <div style={{ marginTop: 24 }} className="inner-container goals-cards">
                {goals.map((goal, index) => (
                    <GoalCard key={goal._id} goal={goal} refreshGoals={refreshGoals} index={index} />
                ))}
            </div>
        </div>
        </>
    )
}

export default GoalsPage;