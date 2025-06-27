import { useState, useEffect } from "react";
import API from "../api";

const Expenses = () => {
  const [form, setForm] = useState({ title: "", total: "" });
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/expenses")
      .then((res) => {
        setExpenses(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("/expenses", form).then((res) =>
      setExpenses([...expenses, res.data])
    );
  };

  return (
    <>
      <h2>Expense Sources</h2>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} name="title" />
        <input onChange={handleChange} name="total" />
        <button type="submit">Submit</button>
      </form>
      {loading ? (
        <p>Loading expenses...</p>
      ) : expenses.length > 0 ? (
        <ul>
          {expenses.map((exp) => {
            return (
              <li key={exp.id}>
                {exp.title}: ${exp.total}
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No expenses yet.</p>
      )}
    </>
  );
};

export default Expenses;
