import { useState, useEffect, useMemo } from "react";
import BudgetCard from "../components/BudgetCard";
import { useFinances } from "../context/FinancesContext";
import { useBudget } from "../context/BudgetContext";

const BudgetPage = () => {
  const { income, expenses } = useFinances();
  const { budget, patchTarget } = useBudget();
  const [targetAmounts, setTargetAmounts] = useState({});

  // Build targetAmounts from budget when it changes
  useEffect(() => {
    if (budget.length > 0) {
      const amounts = {};
      budget.forEach((item) => {
        amounts[item.title] = item.targetAmount;
      });
      setTargetAmounts(amounts);
    }
  }, [budget]);

  // Calculate totals by category
  const totalsByCategory = useMemo(() => {
    return expenses.reduce((acc, item) => {
      const category = item.category;
      const amount = item.total;
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {});
  }, [expenses]);

  // Derive grouped amounts without storing in state
  const groupedAmounts = useMemo(() => {
    return Object.entries(targetAmounts).map(([key, value]) => {
      const curr = totalsByCategory[key.toLowerCase()] || 0;
      return { title: key, targetAmt: value, currentAmt: curr };
    });
  }, [targetAmounts, totalsByCategory]);
  console.log("Grouped Amounts:", groupedAmounts)

  const totalIncome = useMemo(
    () => income.reduce((acc, cur) => acc + cur.total, 0),
    [income]
  );

  const totalExpenses = useMemo(
    () => expenses.reduce((acc, cur) => acc + cur.total, 0),
    [expenses]
  );

  const amountOver = useMemo(() => {
  return groupedAmounts.reduce((acc, { targetAmt, currentAmt }) => {
    return currentAmt > targetAmt ? acc + 1 : acc;
  }, 0);
}, [groupedAmounts]);


  const handleChange = (e, title) => {
    setTargetAmounts((prev) => ({
      ...prev,
      [title]: e.target.value,
    }));
  };

  const handleSubmit = (id, target) => {
    patchTarget(id, Number(target));
  };

  return (
    <div className="inner-wrap">
      {/* Summary Cards */}
      <div className="inner-container">
        <div className="inner-card bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border-cyan-500/30 backdrop-blur-sm">
          <span>Total Budgeted</span>
          <h2 style={{ marginBottom: 0, fontSize: 30, fontWeight: "bold" }}>
            ${totalIncome}
          </h2>
          <p style={{ margin: 0, fontSize: 14 }}>Monthly budget allocation</p>
        </div>
        <div className="inner-card bg-gradient-to-br from-purple-500/20 to-pink-600/20 border-purple-500/30 backdrop-blur-sm">
          <span>Total Spent</span>
          <h2 style={{ marginBottom: 0, fontSize: 30, fontWeight: "bold" }}>
            ${totalExpenses}
          </h2>
          <p style={{ margin: 0, fontSize: 14 }}>
            {totalExpenses > totalIncome ? "Over budget" : "Under Budget"}
          </p>
        </div>
        <div
          className={`inner-card ${
            amountOver > 0
              ? "bg-gradient-to-br from-red-500/20 to-orange-600/20 border-red-500/30 backdrop-blur-sm"
              : "bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30"
          }`}
        >
          <span>Budget Status</span>
          {amountOver > 0 ? (
            <h2
              className="text-red-400"
              style={{ marginBottom: 0, fontSize: 30, fontWeight: "bold" }}
            >
              {amountOver} over
            </h2>
          ) : (
            <h2
              className="text-emerald-400"
              style={{ marginBottom: 0, fontSize: 30, fontWeight: "bold" }}
            >
              On budget
            </h2>
          )}
          <p style={{ margin: 0, fontSize: 14 }}>Categories over budget</p>
        </div>
      </div>

      {/* Breakdown */}
      <div
        style={{ marginTop: 24 }}
        className="inner-card shadow-2xs bg-slate-800/50 border-slate-700/50 backdrop-blur-xl"
      >
        <h2>Budget Breakdown</h2>
        <p style={{ marginBottom: 24 }}>
          Track your spending against your budget by category
        </p>

        {groupedAmounts.map(({ title, targetAmt, currentAmt }) => {
          const matchingBudgetItem = budget.find(
            (b) => b.title === title
          );
          const budgetGoal = {
            currentAmount: currentAmt,
            targetAmount: targetAmt,
            title,
            _id: matchingBudgetItem?._id,
          };

          return (
            <div className="budget-row" key={title}>
              <BudgetCard
                goal={budgetGoal}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                targetAmounts={targetAmounts}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetPage;
