import { useState } from "react";
import API from "../api";
import "../css/inner.css";
import { useFinances } from "../context/FinancesContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
/* ----- Helper Components ----- */

const RenderExpenseOptions = () => (
  <>
    <option value="Entertainment">Entertainment</option>
    <option value="Food">Food</option>
    <option value="Healthcare">Healthcare</option>
    <option value="Housing">Housing</option>
    <option value="Savings">Savings</option>
    <option value="Shopping">Shopping</option>
    <option value="Transportation">Transportation</option>
    <option value="Other">Other</option>
  </>
);

const RenderIncomeOptions = () => (
  <>
    <option value="Salary">Salary</option>
    <option value="Investments">Investments</option>
    <option value="Freelance">Freelance</option>
    <option value="Other">Other</option>
  </>
);

const RenderFinanceForm = ({
  form,
  handleChange,
  handleSubmit,
  handleDateChange,
}) => {
  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setForm((prev) => ({
  //     ...prev,
  //     [name]:
  //       type === "checkbox"
  //         ? checked
  //         : name === "total" || name === "recurringDate"
  //         ? Number(value)
  //         : value,
  //   }));
  // };

  const onSubmit = (e) => {
    e.preventDefault();

    if (form.isRecurring) {
      if (
        !form.recurringType ||
        !form.recurringDate ||
        form.recurringDate === ""
      ) {
        alert("Please select a recurring type and provide a valid day.");
        return;
      }

      const recurringDateNum = Number(form.recurringDate);

      if (
        (form.recurringType === "weekly" &&
          (recurringDateNum < 0 || recurringDateNum > 6)) ||
        (form.recurringType === "monthly" &&
          (recurringDateNum < 1 || recurringDateNum > 31)) ||
        (form.recurringType === "yearly" &&
          (recurringDateNum < 1 || recurringDateNum > 366))
      ) {
        alert("Invalid recurring day for the selected recurring type.");
        return;
      }
    }

    handleSubmit(e);
  };

  return (
    <div className="inner-card shadow-2xs bg-slate-800/50 border-slate-700/50 backdrop-blur-xl">
      <h2
        style={{ margin: 0, fontSize: 24, color: "white", fontWeight: "bold" }}
      >
        Add transaction
      </h2>
      <p className="text-slate-400" style={{ marginTop: 0, fontSize: 14 }}>
        Record your income and expenses
      </p>
      <form style={{ paddingTop: 24 }} onSubmit={onSubmit}>
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
            <input
              type="number"
              name="total"
              placeholder="$0"
              onChange={handleChange}
              value={form.total}
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Category
            <select
              name="category"
              onChange={handleChange}
              value={form.category}
            >
              <option value="" disabled>
                -- Select a category --
              </option>
              {form.type === "income" ? (
                <RenderIncomeOptions />
              ) : (
                <RenderExpenseOptions />
              )}
            </select>
          </label>
        </div>
        <div className="form-row">
          <label>
            Date
            <DatePicker
              selected={form.transactionDate}
              onChange={handleDateChange}
              placeholderText="Select a date"
              className="custom-input"
              calendarClassName="custom-calendar"
              dateFormat="MM/dd/yyyy" // optional: match your existing format
            />
          </label>
          <label style={{ flexDirection: "row", alignItems: "center" }}>
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
              Recurring Type
              <select
                name="recurringType"
                onChange={handleChange}
                value={form.recurringType || ""}
              >
                <option value="">Select</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </label>
            <label>
              {form.recurringType === "weekly"
                ? "Day of Week (0 = Sun)"
                : form.recurringType === "monthly"
                ? "Day of Month (1–31)"
                : "Julian Day (1–366)"}
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
          <button
            className="ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-primary/90 h-10 px-4 py-2 w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/25"
            type="submit"
          >
            Add a transaction
          </button>
        </div>
      </form>
    </div>
  );
};

const RenderFinanceBreakdown = ({ income, expenses }) => {
  const now = new Date();

  const incomeTotal = income
    .filter((item) => {
      const transactionDate = item.transactionDate;
      const inputDate = new Date(transactionDate);
      const isSameMonth =
        inputDate.getMonth() === now.getMonth() &&
        inputDate.getFullYear() === now.getFullYear();
      return item.recurringType === "monthly" || isSameMonth;
    })
    .reduce((acc, num) => acc + num?.total, 0);
  const expensesTotal = expenses
    .filter((item) => {
      const transactionDate = item.transactionDate;
      const inputDate = new Date(transactionDate);
      const isSameMonth =
        inputDate.getMonth() === now.getMonth() &&
        inputDate.getFullYear() === now.getFullYear();
      return item.recurringType === "monthly" || isSameMonth;
    })
    .reduce((acc, num) => acc + num?.total, 0);

  return (
    <div className="inner-card shadow-2xs bg-slate-800/50 border-slate-700/50 backdrop-blur-xl">
      <h2 style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
        Summary
      </h2>
      <p style={{ fontSize: 14 }} className="text-slate-400">
        Your monthly overview
      </p>
      <div
        style={{ marginTop: 24 }}
        className="inner-card-row bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border border-emerald-500/30"
      >
        <span className="text-emerald-100">Total Income</span>
        <span className="font-bold text-emerald-400" style={{ fontSize: 24 }}>
          ${incomeTotal}
        </span>
      </div>
      <div className="inner-card-row bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30">
        <span className="text-red-100">Total Expenses</span>
        <span className="font-bold text-red-400" style={{ fontSize: 24 }}>
          ${expensesTotal}
        </span>
      </div>
      <div className="inner-card-row bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/30">
        <span className="text-cyan-100">Net Income</span>
        <span
          className="font-bold text-cyan-400"
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

const RenderRecentTransactions = ({ transactions, handleClick, openModalIndex, modalForm, handleModalChanges, handleModalDelete, handleModalSubmit }) => (

  

  <div
    style={{ marginTop: 24 }}
    className="inner-card shadow-2xs bg-slate-800/50 border-slate-700/50 backdrop-blur-xl"
  >
    <h2 style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
      Recent Transactions
    </h2>
    <p style={{ fontSize: 14 }} className="text-slate-400">
      Your latest financial activity
    </p>
    <div style={{ marginTop: 24 }} className="transactions-wrap">
      {transactions.map((item, index) => {
        const deleteEndpoint = item.type == "income" ? `/income/${item._id}/remove` : `/expenses/${item._id}/remove`
        const patchEndpoint = item.type == "income" ? `/income/${item._id}/edit` : `/expenses/${item._id}/edit`
        let formatted = "";
        if (item.recurringType == "monthly") {
          const today = new Date();
          const month = today.getMonth()
          const year = today.getFullYear()
          const day = item.recurrenceDetails.dayOfMonth
          const customDate = new Date(year, month, day);
          formatted = new Intl.DateTimeFormat("en-US", {
            timeZone: "UTC",
            month: "long",
            day: "numeric",
            year: "numeric",
          }).format(customDate);
        } else if (item.transactionDate) {
          const date = new Date(item.transactionDate);
          formatted = new Intl.DateTimeFormat("en-US", {
            timeZone: "UTC",
            month: "long",
            day: "numeric",
            year: "numeric",
          }).format(date);
        }
        return (
          <>
          {openModalIndex == index && <div className="transaction-modal">
              
              <form onSubmit={() => handleModalSubmit(patchEndpoint, modalForm)} className="bg-slate-800 border-slate-700 ">
                <div onClick={() => handleClick(null)} className="close-btn"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#ffffff" d="M504.6 148.5C515.9 134.9 514.1 114.7 500.5 103.4C486.9 92.1 466.7 93.9 455.4 107.5L320 270L184.6 107.5C173.3 93.9 153.1 92.1 139.5 103.4C125.9 114.7 124.1 134.9 135.4 148.5L278.3 320L135.4 491.5C124.1 505.1 125.9 525.3 139.5 536.6C153.1 547.9 173.3 546.1 184.6 532.5L320 370L455.4 532.5C466.7 546.1 486.9 547.9 500.5 536.6C514.1 525.3 515.9 505.1 504.6 491.5L361.7 320L504.6 148.5z"/></svg></div>
                <h2 style={{fontWeight:"bold", fontSize:24, marginBottom:20}}>Edit your transaction</h2>
                <div className="form-row"><label> {item.type == "income" ? "Income title" : "Expense Title"} <input value={modalForm.title} onChange={(e) => handleModalChanges("title", e.target.value)} /></label></div>
               <div className="form-row"> <label>{item.type == "income" ? "Income Total" : "Expense Total"} <input value={modalForm.total} onChange={(e) => handleModalChanges("total", e.target.value)} /></label></div>
               {item.isRecurring ? (
                <>
                <div className="form-row">
                <label>Recurring Type
                  <select value={modalForm.recurringType} onChange={(e) => handleModalChanges("recurringType", e.target.value)}>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </label>
               </div>
              <div className="form-row">
                 <label>Recurring Date <input value={modalForm.recurrenceDetails.dayOfMonth} onChange={(e) => handleModalChanges("recurrenceDetails.dayOfMonth", e.target.value)}/></label>
              </div>
              </>
              ) : ""}
               <div className="form-row">
                <button className="bg-green-500">Save Changes</button>
                <button className="bg-red-500" onClick={() => handleModalDelete(deleteEndpoint)}>Delete</button>
                </div>
              </form>
              
            </div> }
          <div
            key={index}
            className="inner-card-transaction bg-slate-700/30 hover:bg-slate-700/50 transition-colors duration-200"
            onClick={() => handleClick(index)}
          >
            
            <div className="left-inner">
              <span style={{ fontWeight: "bold", color: "white" }}>
                {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
              </span>
              <span className="text-slate-400">{formatted}</span>
            </div>
            <div className="right-inner">
              <span
                className={`${
                  item.type === "income" ? "text-emerald-400" : "text-red-400"
                }`}
                style={{ fontSize: 18, fontWeight: "bold" }}
              >
                {item.type === "income" ? "+ " : "- "}${item.total}
              </span>
            </div>
          </div>
          </>
        );
      })}
    </div>
  </div>
);

/* ----- Main Component ----- */

const FinancesPage = () => {
  const { income, expenses, refreshFinances, loading, postFinance, deleteFinance , patchFinance } =
    useFinances();
  const [form, setForm] = useState({
    type: "expense",
    total: null,
    category: "",
    isRecurring: false,
    recurringType: "none",
    recurringDate: "",
    title: "",
    transactionDate: new Date(),
  });

  const [modalForm, setModalForm] = useState({
    title:"",
    total:"",
    recurringType:"",
    recurrenceDetails: {dayOfMonth:""}
  })

  

 
   const [openModalIndex, setOpenModalIndex] = useState(null);
   const handleClick = (index) => {
    if(index !== null) {
      const item = transactions[index];
      setModalForm({
        title: item.title,
        total: item.total,
        recurringType: item.recurringType || "",
        recurrenceDetails: {dayOfMonth:item.recurrenceDetails?.dayOfMonth || ""}
      })
    }
    setOpenModalIndex((prev) => prev = index )
   }

   const handleModalChanges = (field, value) => {
  if (field.includes(".")) {
    // Handle nested fields e.g. "recurrenceDetails.dayOfMonth"
    const [parent, child] = field.split(".");
    setModalForm(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: value
      }
    }));
  } else {
    // Handle top-level fields
    setModalForm(prev => ({
      ...prev,
      [field]: value
    }));
  }
};



   const handleModalDelete = async (endpoint) => {
    await deleteFinance(endpoint)
    setOpenModalIndex((prev) => prev = null)
    await refreshFinances()
   }

   const handleModalSubmit = async (endpoint, form) => {
    await patchFinance(endpoint, form)
    setOpenModalIndex((prev) => prev = null)
    await refreshFinances()
   }
  

  const transactions = [
    ...income.map((item) => ({ ...item, type: "income" })),
    ...expenses.map((item) => ({ ...item, type: "expense" })),
  ].sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate)); // optional sort by date desc

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "total" || name === "recurringDate"
          ? Number(value)
          : value,
    }));
  };

  const handleDateChange = (date) => {
    setForm((prev) => ({
      ...prev,
      transactionDate: date,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category) {
      alert("Please select a category.");
      return;
    } else if (form.total == null) {
      alert("Please enter a total");
    }

    const endpoint = form.type === "income" ? "/income" : "/expenses";

    // Create payload from form
    const payload = {
      ...form,
      transactionDate: form.transactionDate.toISOString().split("T")[0],
      category: form.category.toLowerCase()
    };

    // Build recurrenceDetails based on type
    if (form.isRecurring && form.recurringType) {
      const recurrenceDetails = {};

      switch (form.recurringType) {
        case "weekly":
          recurrenceDetails.dayOfWeek = Number(form.recurringDate); // 0–6
          break;
        case "monthly":
          recurrenceDetails.dayOfMonth = Number(form.recurringDate); // 1–31
          break;
        case "yearly":
          recurrenceDetails.dayOfYear = Number(form.recurringDate);
          break;
      }

      payload.recurrenceDetails = recurrenceDetails;
    }



    try {
      await postFinance(endpoint, payload);
      await refreshFinances();

      // Reset form
      setForm({
        total: 0,
        title: "",
        isRecurring: false,
        category: "",
        type: "income",
        transactionDate: new Date(),
        recurringType: "",
        recurringDate: "",
      });
    } catch (err) {
      console.error("Error saving transaction", err);
    }
  };

  if (loading) return <p>Loading finances...</p>;

  return (
    <div className="inner-wrap">
      <div className="inner-container">
        <RenderFinanceForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <RenderFinanceBreakdown income={income} expenses={expenses} />
      </div>
      <RenderRecentTransactions transactions={transactions} handleClick={handleClick} openModalIndex={openModalIndex} handleModalChanges={handleModalChanges} modalForm={modalForm} handleModalDelete={handleModalDelete} handleModalSubmit={handleModalSubmit}  />
    </div>
  );
};

export default FinancesPage;
