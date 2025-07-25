import { useState, useEffect } from "react";
import API from '../api'
import BudgetCard from "../components/BudgetCard";
import { useFinances } from "../context/FinancesContext";

const BudgetPage = () => {
    const {income, expenses} = useFinances()
   

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


    const amountOver = Object.entries(totalsByCategory).reduce((acc, [_, total]) => {
        return total > 1000 ? acc + 1 : acc;
    }, 0);
    

    return (
        <>
        <div className="inner-wrap">
            <div className="inner-container">
                <div className="inner-card bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-cyan-500/30 backdrop-blur-sm">
                    <span>Total Budgeted</span>
                    <h2 style={{marginBottom:0, fontSize:30, fontWeight:"bold"}}>${totalIncome}</h2>
                    <p style={{margin:0, fontSize:14}}>Monthly budget allocation</p>
                </div>
                <div className="inner-card bg-gradient-to-br from-purple-500/20 to-pink-600/20 border-purple-500/30 backdrop-blur-sm">
                    <span>Total Spent</span>
                    <h2 style={{marginBottom:0, fontSize:30, fontWeight:"bold"}}>${totalExpenses}</h2>
                    <p style={{margin:0, fontSize:14}}>{totalExpenses > totalIncome ? "Over budget" : "Under Budget"}</p>
                </div>
                <div className={`inner-card ${amountOver > 0 ? "bg-gradient-to-br from-red-500/20 to-orange-600/20 border-red-500/30 backdrop-blur-sm" : "bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30"}`}>
                    <span>Budget Status</span>
                    {amountOver > 0 ? <h2 className="text-red-400" style={{marginBottom:0, fontSize:30, fontWeight:"bold"}}>{amountOver} over</h2> : <h2 className="text-emerald-400" style={{marginBottom:0, fontSize:30, fontWeight:"bold"}}>On budget</h2> }
                    <p style={{margin:0, fontSize:14}}>Categories over budget</p>
                </div>
            </div>
            <div style={{marginTop:24}} className="inner-card shadow-2xs bg-slate-800/50 border-slate-700/50 backdrop-blur-xl">
                <h2>Budget Breakdown</h2>
                <p style={{marginBottom:24}}>Track your spending against your budget by category</p>
                {Object.entries(totalsByCategory).map(([title, total]) => {
                    const budgetGoal = {currentAmount:total, targetAmount: 1000, title:title}
                    
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