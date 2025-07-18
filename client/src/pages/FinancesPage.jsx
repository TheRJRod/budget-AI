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
    <div className="inner-card shadow-2xs bg-slate-800/50 border-slate-700/50 backdrop-blur-xl">
        <h2 style={{ margin: 0, fontSize:24, color:'white', fontWeight:'bold' }}>Add transaction</h2>
        <p className="text-slate-400" style={{ marginTop: 0, fontSize:14 }}>Record your income and expenses</p>
        <form style={{paddingTop:24}} onSubmit={handleSubmit}>
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
                <button className="ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary/90 h-10 px-4 py-2 w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/25" type="submit">Add a transaction</button>
            </div>
        </form>
    </div>
);

const RenderFinanceBreakdown = ({ income, expenses }) => {
    const incomeTotal = income.reduce((acc, num) => acc + num?.total, 0);
    const expensesTotal = expenses.reduce((acc, num) => acc + num?.total, 0);

    return (
        <div className="inner-card shadow-2xs bg-slate-800/50 border-slate-700/50 backdrop-blur-xl">
            <h2 style={{color:"white", fontSize:24, fontWeight:'bold'}}>Summary</h2>
            <p style={{fontSize:14}} className="text-slate-400">Your financial overview</p>
            <div style={{marginTop:24}} className="inner-card-row bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30">
                <span className="text-emerald-100">Total Income</span>
                <span className="font-bold text-emerald-400" style={{ fontSize: 24 }}>${incomeTotal}</span>
            </div>
            <div className="inner-card-row bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30">
                <span className="text-red-100">Total Expenses</span>
                <span className="font-bold text-red-400" style={{ fontSize: 24 }}>${expensesTotal}</span>
            </div>
            <div className="inner-card-row bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/30" >
                <span className="text-cyan-100">Net Income</span>
                <span className="font-bold text-cyan-400"
                    style={{
                        fontSize: 24,
                        
                        
                    }}
                >
                    ${incomeTotal - expensesTotal}
                </span>
            </div>
        </div>
    );
};

const RenderRecentTransactions = ({ transactions }) => (

    <div style={{ marginTop: 24 }} className="inner-card shadow-2xs bg-slate-800/50 border-slate-700/50 backdrop-blur-xl">
        <h2 style={{color:"white", fontSize:24, fontWeight:'bold'}}>Recent Transactions</h2>
        <p style={{fontSize:14}} className="text-slate-400">Your latest financial activity</p>
        <div style={{marginTop:24}} className="transactions-wrap">
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
                <div key={index} className="inner-card-transaction bg-slate-700/30 hover:bg-slate-700/50 transition-colors duration-200">
                    <div className="left-inner">
                        <span style={{ fontWeight: 'bold', color:'white' }}>{item.title}</span>
                        <span className="text-slate-400">{formatted}</span>
                    </div>
                    <div className="right-inner">
                        <span className={`${item.type === "income" ? "text-emerald-400" : "text-red-400"}`} style={{ fontSize: 18, fontWeight: 'bold' }}>
                            {item.type === "income" ? "+ " : "- "}${item.total}
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
