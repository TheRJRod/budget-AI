import { useState, useEffect, useContext, createContext } from "react";
import API from '../api';

const GoalContext = createContext();
export const useGoals = () => useContext(GoalContext)

export const GoalsProvider = ({children}) => {
    const [goals, setGoals] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchGoals = async () => {
            try {
                const res = await API.get('/goals')
                setGoals(res.data)
                
            } catch (error) {
                console.log("Error fetching goals:", error)
            }
        }

    const postGoals = async (formData) => {
         try {
            const res = await API.post('/goals', formData);
            const newGoal = {
            ...res.data,
            currentAmount: res.data.currentAmount || 0,
            targetAmount: Number(res.data.targetAmount || 0)
            };

            setGoals([...goals, newGoal]);
        } catch (error) {
            console.error("Error creating goal:", error);
        }

    }


    useEffect(() => {
        fetchGoals().finally(() => setLoading(false))
    }, [])

    return (
        <GoalContext.Provider value={{goals, setGoals, loading, refreshGoals: fetchGoals, postGoals}}>
            {children}
        </GoalContext.Provider>
    )

}