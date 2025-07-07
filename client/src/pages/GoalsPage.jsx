import { useState, useEffect } from "react";
import API from "../api";
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

const GoalsPage = () => {
    const [goals, setGoals] = useState([])
    const [form, setForm] = useState({title:"", targetAmount:"", deadline:"", category:""})
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchGoals = async () => {
            try {
                 const res = await API.get('/goals')
                 setGoals(res.data)
            } catch (error) {
                console.log("Error fetching goals", error)
            } finally {
                setLoading(false)
            }
        }

        fetchGoals()

    }, [])

    const handlePostSubmit = (e) => {
        e.preventDefault();
        API.post('/goals', form)
        .then(res => setGoals([...goals, res.data]))
    }

    const handlePostChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const renderGoals = goals.map((goal) => {
        const progress = goal.currentAmount / goal.targetAmount
        const percentage = Math.min(Math.round(progress * 100), 100)
        const rising = Math.random() > 0.5 // Placeholder for trend direction

        return (
          <div key={goal._id} className="inner-card">
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
    })

    return (
        <>
        <div className="inner-wrap">
            <div className="inner-card">
                <h2>Create New Goal</h2>
                <p>Set a new savings target to work towards</p>
                <form onSubmit={handlePostSubmit}>
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
                <button type="submit">Submit Goal</button>
                </div>
                </form>
            </div>
            <div style={{marginTop:24}} className="inner-container">
            {renderGoals}
            </div>
        </div>
        </>
    )
}

export default GoalsPage;