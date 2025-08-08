import { useState, useEffect } from "react";
import API from "../api";
import { LucideDollarSign } from "lucide-react";

const UpcomingBills = () => {
  const today = new Date();
  const currentMonthName = new Intl.DateTimeFormat("en-US", {
    month: "long",
  })
    .format(today)
    .toLowerCase();

  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [billMonth, setBillMonth] = useState(currentMonthName);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const res = await API.get("/expenses");
        // Filter for recurring bills that have monthly recurrence with dayOfMonth
        const recurringBills = res.data.filter((item) => 
          item.isRecurring && 
          item.recurringType === "monthly" && 
          item.recurrenceDetails?.dayOfMonth
        );
        setBills(recurringBills);

      } catch (error) {
        console.log("Error fetching bills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBills();
  }, []);

  const handleChange = (e) => {
    setBillMonth(e.target.value);
  };

  const getMonthIndex = (monthName) =>
    new Date(`${monthName} 1, 2020`).getMonth(); // Returns 0–11

  const renderedBills = bills
    .filter((bill) => {
      // Since we already filtered for monthly recurring bills in the fetch,
      // we just need to check if the bill has a valid dayOfMonth
      return bill.recurrenceDetails?.dayOfMonth;
    })
    .sort((a, b) => a.recurrenceDetails.dayOfMonth - b.recurrenceDetails.dayOfMonth)
    .map((item) => {
      const monthIndex = getMonthIndex(billMonth);
      const year = today.getFullYear();
      const dayOfMonth = item.recurrenceDetails.dayOfMonth;
      
      // Handle edge case where dayOfMonth might be > days in selected month
      const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
      const actualDay = Math.min(dayOfMonth, daysInMonth);
      
      const billDate = new Date(year, monthIndex, actualDay);
      const formatted = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(billDate);

      return (
        <div
          className="flex justify-between items-center bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-md p-3"
          key={item?._id}
        >
          <div>
            <div className="font-semibold text-white">
              {item?.title}
            </div>
            <div className="text-sm text-slate-300">{formatted}</div>
            {dayOfMonth !== actualDay && (
              <div className="text-xs text-yellow-400">
                (Adjusted from day {dayOfMonth})
              </div>
            )}
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-white">${item?.total}</span>
            <div className="text-xs text-slate-400">
              Day {dayOfMonth}
            </div>
          </div>
        </div>
      );
    });

  return (
    <>
      {loading ? (
        <p className="text-slate-400">Loading bills...</p>
      ) : bills.length > 0 ? (
        <div className="space-y-4">
          <div className="bills-heading flex justify-between items-center">
            <h2 className="text-2xl font-bold flex items-center gap-[10px] text-white">
              <LucideDollarSign className="text-purple-400" /> Recurring Bills
            </h2>
            <select 
              onChange={handleChange} 
              value={billMonth}
              className="bg-slate-800 text-white border border-slate-600 rounded px-3 py-1"
            >
              {[
                "january",
                "february",
                "march",
                "april",
                "may",
                "june",
                "july",
                "august",
                "september",
                "october",
                "november",
                "december",
              ].map((m) => (
                <option key={m} value={m}>
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-3 recurring-container">
            {renderedBills.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <p>No bills for {billMonth.charAt(0).toUpperCase() + billMonth.slice(1)}</p>
              </div>
            ) : (
              renderedBills
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-slate-400">
          <p className="text-white">No recurring bills set up yet.</p>
          <p className="text-sm mt-2 text-white">Add some recurring expenses to see them here!</p>
        </div>
      )}
    </>
  );
};

export default UpcomingBills;