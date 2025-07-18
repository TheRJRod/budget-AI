import { useState, useEffect } from "react";
import API from "../api";

const ExpensePage = () => {
    const [allExpenses, setAllExpenses] = useState([])
    const [loading, setLoading] = useState(true)
    const [form, setForm] = useState({title:"", total:"", date:""})

    useEffect( () => {
        const fetchExpenses = async () => {
            try {
                const res = await API.get('/expenses');
                setAllExpenses(res.data)
            } catch (error) {
                console.log("Error fetching expenses", error)
            } finally {
                setLoading(false)
            }
        }
        fetchExpenses()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        API.post('/expenses', form)
        .then(res => setAllExpenses([...allExpenses, res.data]))
    }

    const handleChange = (e) => {
  const { name, type, value, checked } = e.target;
  setForm({
    ...form,
    [name]: type === "checkbox" ? checked : value,
  });
};


    return (
        <>
        <div className="inner-wrap">
        {loading ? (<p>Loading all expenses...</p>) : allExpenses.length > 0 ?
        (allExpenses.map((item) => {
            return (
                <p>{item.title}</p>
            )
        })) : (
            <p>No income yet.</p>
        )
    }
    <form onSubmit={handleSubmit}>
  <input onChange={handleChange} name="title" placeholder="Title" />
  <input onChange={handleChange} name="total" placeholder="Total" type="number" />
  <input onChange={handleChange} name="date" type="date" />

  {/* Recurring Toggle */}
  <label>
    <input
      type="checkbox"
      name="isRecurring"
      onChange={(e) =>
        setForm({ ...form, isRecurring: e.target.checked })
      }
    />
    Recurring?
  </label>

  {/* Recurring Type Dropdown */}
  {form.isRecurring && (
    <>
      <select
        name="recurringType"
        onChange={handleChange}
        value={form.recurringType || ""}
      >
        <option value="">Select Frequency</option>
        <option value="monthly">Monthly</option>
        <option value="weekly">Weekly</option>
        <option value="yearly">Yearly</option>
      </select>

      {/* Recurring Day/Date */}
      <input
        type="number"
        name="recurringDate"
        placeholder={
          form.recurringType === "weekly"
            ? "Day of Week (0 = Sun, 6 = Sat)"
            : "Day of Month (1 - 31)"
        }
        onChange={handleChange}
        value={form.recurringDate || ""}
      />
    </>
  )}

  <button type="submit">Submit</button>
</form>

</div>
        </>
    )
}

export default ExpensePage;