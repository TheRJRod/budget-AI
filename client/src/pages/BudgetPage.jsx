import { useState, useEffect } from "react";
import API from '../api'
import BudgetCard from "../components/BudgetCard";

const BudgetPage = () => {
    const [expenses, setExpenses] = useState([])
    const [income, setIncome] = useState([])
    const [loading, setLoading] = useState(true)
    const [amountOver, setAmountOver] = useState(0)
   
    

    useEffect(() => {
        const fetchFinances = async () => {
            try {
            const resInc = await API.get('/income')
            const resExp = await API.get('/expenses')
            setIncome(resInc.data)
            setExpenses(resExp.data)
            } catch (error) {
                console.log("Error fetching finances:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchFinances()
    }, [])

    const totalsByCategory = expenses.reduce((acc, item) => {
        const category = item.category;
        const amount = item.total;

        if(!acc[category]){
            acc[category] = 0;
        }

        acc[category] += amount;

        return acc
    }, {})

    
    const totalIncome = income.reduce((acc, cur) => {
        const total = cur.total
        return acc + total
    }, 0)

    const totalExpenses = expenses.reduce((acc, cur) => {
        const total = cur.total;
        return acc + total
    }, 0)

    

    return (
        <>
        <div className="inner-wrap">
            <div className="inner-container">
                <div className="inner-card">
                    <span>Total Budgeted</span>
                    <h2 style={{marginBottom:0}}>${totalIncome}</h2>
                    <p style={{margin:0, fontSize:14}}>Monthly budget allocation</p>
                </div>
                <div className="inner-card">
                    <span>Total Spent</span>
                    <h2 style={{marginBottom:0}}>${totalExpenses}</h2>
                    <p style={{margin:0, fontSize:14}}>{totalExpenses > totalIncome ? "Over budget" : "Under Budget"}</p>
                </div>
                <div className="inner-card">
                    <span>Budget Status</span>
                    {amountOver > 0 ? <h2 style={{color:'red', marginBottom:0}}>{amountOver} over</h2> : <h2 style={{color:"green", marginBottom:0}}>On budget</h2> }
                    <p style={{margin:0, fontSize:14}}>Categories over budget</p>
                </div>
            </div>
            <div style={{marginTop:24}} className="inner-card">
                <h2>Budget Breakdown</h2>
                <p>Track your spending against your budget by category</p>
                {Object.entries(totalsByCategory).map(([title, total]) => {
                    const budgetGoal = {currentAmount:total, targetAmount: 1000, title:title}
                    if(budgetGoal.currentAmount > budgetGoal.targetAmount) {
                        setAmountOver(prev => prev + 1)
                    }
                   return (
                   <div className="budget-row" key={title}>
                    <BudgetCard key={title} goal={budgetGoal}  />
                   </div>
                   )
                })}
            </div>
        </div>
        </>
    )
}

export default BudgetPage;