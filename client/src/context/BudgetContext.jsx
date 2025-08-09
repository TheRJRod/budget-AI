import { useState, useEffect, useContext, createContext } from "react";
import API from "../api";

const BudgetContext = createContext()
export const useBudget = () => useContext(BudgetContext)

export const BudgetProvider = ({children}) => {
    const [budget, setBudget] = useState([])

    useEffect(() => {

        const fetchBudget = async () => {
            try {
                const res = await API.get("/budget")
                setBudget(res.data)
            } catch (error) {
                console.log("Error fetching budget:", error)
            }
        }

        fetchBudget()

    }, [])


    const postBudget = async (budgetData) => {
        try {
            const res = await API.post("/budget", budgetData)
            setBudget([...budget, res.data])
        } catch (error) {
            console.log("Error posting budget:", error)
        }
    }

    const patchTarget = async (id, target ) => {
        try {
            const res = await API.patch(`/budget/${id}/target`, {targetAmount: target})

        } catch (error) {
            console.log("Error patching budget:", error)
        }
    }

    return (

    <BudgetContext.Provider value={{budget, setBudget, postBudget, patchTarget}}>
        {children}
    </BudgetContext.Provider>
    )
}

