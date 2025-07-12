import { useEffect, useState } from "react";
import API from '../api';
import "../css/inner.css";

/* ----- Helper Components ----- */

const RenderIncomeOptions = () => (
    <>
        <option value="Salary">Salary</option>
        <option value="Freelance">Freelance</option>
        <option value="Other">Other</option>
    </>
);

const RenderExpenseOptions = () => (
    <>
        <option value="Bill">Bill</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Food">Food</option>
        <option value="Healthcare">Healthcare</option>
        <option value="Savings">Savings</option>
        <option value="Subscriptions">Subscriptions</option>
        <option value="Transportation">Transportation</option>
        <option value="Other">Other</option>
    </>
);

const RenderFinanceForm = ({ form, handleChange, handleSubmit }) => (
    <div className="inner-card">
        <h2 style={{ margin: 0 }}>Add transaction</h2>
        <p style={{ marginTop: 0 }}>Record your income and expenses</p>
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <label>
                    Type
                    <select name="type" onChange={handleChange} value={form.type}>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </label>
                <label>
                    Total
                    <input name="total" onChange={handleChange} value={form.total} />
                </label>
            </div>
            <div className="form-row">
                <label>
                    Category
                    <select name="category" onChange={handleChange} value={form.category}>
                        {form.type === "income" ? <RenderIncomeOptions /> : <RenderExpenseOptions />}
                    </select>
                </label>
            </div>
            <div className="form-row">
                <label>
                    Date
                    <input type="date" name="transactionDate" onChange={handleChange} value={form.transactionDate} />
                </label>
                <label style={{ flexDirection: 'row', alignItems: 'center' }}>
                    Recurring?
                    <input
                        style={{ width: 16 }}
                        type="checkbox"
                        name="isRecurring"
                        onChange={handleChange}
                        checked={form.isRecurring}
                    />
                </label>
            </div>
            {form.isRecurring && (
                <div className="form-row">
                    <label>
                        Type
                        <select name="recurringType" onChange={handleChange} value={form.recurringType || ""}>
                            <option value="">Select</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </label>
                    <label>
                        Day
                        <input
                            type="number"
                            name="recurringDate"
                            value={form.recurringDate || ""}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            )}
            <div className="form-row">
                <label>
                    Description
                    <input name="title" onChange={handleChange} value={form.title} />
                </label>
            </div>
            <div className="form-row">
                <button type="submit">Add a transaction</button>
            </div>
        </form>
    </div>
);

const RenderFinanceBreakdown = ({ income, expenses }) => {
    const incomeTotal = income.reduce((acc, num) => acc + num?.total, 0);
    const expensesTotal = expenses.reduce((acc, num) => acc + num?.total, 0);

    return (
        <div className="inner-card">
            <h2>Summary</h2>
            <p>Your financial overview</p>
            <div className="inner-card-row">
                <span>Total Income</span>
                <span style={{ fontSize: 24, color: 'green', fontWeight: 'bold' }}>${incomeTotal}</span>
            </div>
            <div className="inner-card-row">
                <span>Total Expenses</span>
                <span style={{ fontSize: 24, color: 'red', fontWeight: 'bold' }}>${expensesTotal}</span>
            </div>
            <div className="inner-card-row" style={{ borderTop: '1px solid rgb(228 228 231)', paddingTop: 14 }}>
                <span>Net Income</span>
                <span
                    style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: incomeTotal - expensesTotal < 0 ? "red" : "green"
                    }}
                >
                    ${incomeTotal - expensesTotal}
                </span>
            </div>
        </div>
    );
};

const RenderRecentTransactions = ({ transactions }) => (

    <div style={{ marginTop: 24 }} className="inner-card">
        <h2 style={{ margin: 0 }}>Recent Transactions</h2>
        <p style={{ marginTop: 0 }}>Your latest financial activity</p>
        <div className="transactions-wrap">
            {transactions.map((item, index) => {
                let formatted = ""
                if(item.transactionDate) {
                const date = new Date(item.transactionDate)
               formatted = new Intl.DateTimeFormat("en-US", {
                    month:"long",
                    day:'numeric',
                    year:'numeric'
                }).format(date)
            }
                return (
                <div key={index} className="inner-card-transaction">
                    <div className="left-inner">
                        <span style={{ fontWeight: 'bold' }}>{item.title}</span>
                        <span>{formatted}</span>
                    </div>
                    <div className="right-inner">
                        <span style={{ fontSize: 18, fontWeight: 'bold', color: item.type === 'income' ? 'green' : 'red' }}>
                            ${item.total}
                        </span>
                    </div>
                </div>
                )
            })}
        </div>
    </div>
);

/* ----- Main Component ----- */

const FinancesPage = () => {
    const [income, setIncome] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [form, setForm] = useState({
        total: "",
        title: "",
        isRecurring: false,
        category: "",
        type: "income",
        transactionDate: "",
        recurringType: null,
        recurringDate: null
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFinances = async () => {
            try {
                const resInc = await API.get('/income');
                const resExp = await API.get('/expenses');

                const incomeWithType = resInc.data.map(item => ({ ...item, type: 'income' }));
                const expensesWithType = resExp.data.map(item => ({ ...item, type: 'expense' }));

                setIncome(resInc.data);
                setExpenses(resExp.data);
                setTransactions([...incomeWithType, ...expensesWithType]);
            } catch (error) {
                console.log("Error fetching Finances", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFinances();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const endpoint = form.type === "income" ? '/income' : '/expenses';

        API.post(endpoint, form)
            .then(res => {
                const newTransaction = { ...res.data, type: form.type };
                setTransactions(prev => [...prev, newTransaction]);
            })
            .catch(err => console.error("Error saving transaction", err));
    };

    if (loading) return <p>Loading finances...</p>;

    return (
        <div className="inner-wrap">
            <div className="inner-container">
                <RenderFinanceForm form={form} handleChange={handleChange} handleSubmit={handleSubmit} />
                <RenderFinanceBreakdown income={income} expenses={expenses} />
            </div>
            <RenderRecentTransactions transactions={transactions} />
        </div>
    );
};

export default FinancesPage;
