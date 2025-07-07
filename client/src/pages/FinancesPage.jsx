import { useEffect, useState } from "react";
import API from '../api'
import "../css/inner.css"

const FinancesPage = () => {
    const [income, setIncome] = useState([])
    const [expenses, setExpenses] = useState([])
    const [transactions, setTransactions] = useState([])
    const [form, setForm] = useState({total:"", isRecurring:false })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchFinances = async () => {
            try {
                const resInc = await API.get('/income')
                const resExp = await API.get('/expenses')
                const incomeWithType = resInc.data.map(item => ({
                    ...item,
                    type: 'income'
                }));

                
                const expensesWithType = resExp.data.map(item => ({
                    ...item,
                    type: 'expense'
                }));
                setIncome(resInc.data)
                setExpenses(resExp.data)
                setTransactions([...incomeWithType, ...expensesWithType])
            } catch (error) {
                console.log("Error fetching Finances", error)
            } finally {
                setLoading(false)
            }
        }
        fetchFinances()
    }, [])

    const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
        ...form,
        [name]: type === "checkbox" ? checked : value
    });
};


   


    const RenderFinanceForm = () => {
        return (
            <>
            <div className="inner-card">
                <h2 style={{margin:0}}>Add transaction</h2>
                <p style={{marginTop:0}}>Record your income and expenses</p>
            <form>
                <div className="form-row">
                <label>
                    Type
                <select>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                </label>
                <label>
                    Total
                <input name="total" />
                </label>
                </div>
                <div className="form-row">
                    <label>
                        Category
                <select>
                    <option>Salary</option>
                    <option>Freelance</option>
                    <option>Other</option>
                </select>
                </label>
                </div>
                <div className="form-row">
                    <label>
                        Date
                        <input type="date" />
                    </label>
                    <label style={{flexDirection:'row', alignItems:'center'}}>
                        Recurring?
                        <input style={{width:16}} type="checkbox" name="isRecurring" onChange={handleChange} checked={form.isRecurring} />
                    </label>
                </div>
                { form.isRecurring &&
                <div className="form-row">
                    <label>
                        Type
                        <select>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </label>
                    <label>
                        Day
                        <input type="number" />
                    </label>
                </div>
                }
                <div className="form-row">
                    <label>
                        Description
                <input name="title" />
                </label>
                </div>
                <div className="form-row">
                <button type="submit">Add a transaction</button>
                </div>
            </form>
            </div>
            </>
        )
    }


    const RenderFinanceBreakdown = () => {
        const incomeTotal = income.reduce((acc, num) => {return acc + num?.total}, 0)
        const incomeExpenses = expenses.reduce((acc, num) => {return acc + num?.total}, 0)

        return (
            <>
           <div className="inner-card">
                <h2>Summary</h2>
                <p>Your financial overview</p>
                <div className="inner-card-row">
                    <span>Total Income</span>
                    <span style={{fontSize:24, color:'green', fontWeight:'bold'}}>${incomeTotal}</span>
                </div>
                <div className="inner-card-row">
                    <span>Total Expenses</span>
                    <span style={{fontSize:24, color:'red', fontWeight:'bold'}}>${incomeExpenses}</span>
                </div>
                <div className="inner-card-row" style={{borderTop: '1px solid rgb(228 228 231)', paddingTop:14}}>
                    <span>Net Income</span>
                    <span style={{fontSize:24, fontWeight:'bold', color:`${incomeTotal - incomeExpenses < 0 ? "red" : "green"}`}}>${incomeTotal - incomeExpenses}</span>
                </div>
            </div> 
            </>
        )
    }


    const RenderRecentTransactions = () => {
        return (
            <>
            <div style={{marginTop:24}} className="inner-card">
                <h2 style={{margin:0}}>Recent Transactions</h2>
                <p style={{marginTop:0}}>Your latest financial activity</p>
                <div className="transactions-wrap">
                { transactions.map((item) => {
                    return (
                    <div className="inner-card-transaction">
                        <div className="left-inner">
                        <span style={{fontWeight:'bold'}}>{item.title}</span>
                        <span>{item.createdAt}</span>
                        </div>
                        <div className="right-inner">
                        <span style={{fontSize:18, fontWeight:'bold', color: item.type === 'income' ? 'green' : 'red'}}>${item.total}</span>
                        </div>
                    </div>
                    )
                })
                }   
                </div>
            </div>
            </>
        )
    }

    
    


    return (
        <>
        <div className="inner-wrap">
            <div className="inner-container">
            <RenderFinanceForm />
            <RenderFinanceBreakdown />
            </div>
            <RenderRecentTransactions />
        </div>
        </>
    )
}

export default FinancesPage;