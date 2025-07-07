import { useState, useEffect } from "react";
import API from "../api.js"

const Goals = () => {
    const [form, setForm] = useState({title:"", targetAmount:"", deadline:"" })
    const [loading, setLoading] = useState(true)
    const [goals, setGoals] = useState([])

    useEffect(() => {
        const fetchGoals = async () => {
        try {
            const res = await API.get('goals')
            setGoals(res.data)
        } catch (error) {
            console.log("Error requesting all goals", error)
           
        } finally {
            setLoading(false)
        }
    }
    fetchGoals();
    }, [])

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post('/goals', form)
            setGoals([...goals, res.data])
            setForm({title:"", targetAmount:"", deadline:""})
        } catch (error) {
            console.log("Error adding goal", error)
        }
        

    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} name="title" value={form.title} />
            <input onChange={handleChange} name="targetAmount" type="number" value={form.targetAmount} />
            <input onChange={handleChange} name="deadline" value={form.deadline} type="date" />
            <button type="submit">Submit</button>
        </form>
        {loading ? 
        (<p>Loading all goals...</p>) : goals.length > 0 ?
        (
            <ul>
                {goals.map((goal) => {
                    return (
                        <li style={{color:"white"}} key={goal._id}>{goal.title}: {goal.targetAmount}</li>
                    )
                })}
            </ul>
        ) : (
            <p>No goals added yet.</p>
        )   
    }
        </>
    )
}

export default Goals;