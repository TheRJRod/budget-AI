import { useState } from "react";
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import API from "../api";

const BudgetCard = ({ goal }) => {

    const progress = goal.currentAmount / goal.targetAmount;
    const percentage = Math.min(Math.round(progress * 100), 100);






    return (
        
        <div className="inner-card">
            <div className="top-card">
                    <span style={{ fontWeight: 700, fontSize: 22 }}>{goal.title}</span>
                    <div style={{display:"flex", flexDirection:'column', alignItems:'flex-end', gap:5}}>
                    <span style={{fontWeight:'bold'}}>${goal.currentAmount} / ${goal.targetAmount}</span>
                    <span style={{color:`${goal.targetAmount - goal.currentAmount < 0 ? "red" : "green"}`}}>${`${goal.targetAmount - goal.currentAmount}`}{goal.targetAmount - goal.currentAmount < 0 ? " over" : " left"}</span>
                    </div>
            </div>

            <div className="middle-card">
                <div className="goal-chart-bar-bg">
                    <div className="goal-chart-bar-fill" style={{ width: `${percentage}%` }}></div>
                </div>
                <div className="goal-chart-percentage">
                        <span style={{marginTop:10}}>{percentage}% used</span>
                    </div>
                
            </div>

        </div>
    );
};

export default BudgetCard;
