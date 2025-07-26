import { useState, useEffect } from "react";
import API from "../api";
import { LucideDollarSign } from "lucide-react";

const UpcomingBills = () => {
    const currDate = new Intl.DateTimeFormat("en-US", {
            month:"long"
        }).format(Date.now()).toLowerCase()

    const [bills, setBills] = useState([])
    const [loading, setLoading] = useState(true)
    const [billMonth, setBillMonth] = useState(currDate)

    useEffect(() => {
        const fetchBills = async () => {
        try {
            const res = await API.get('/expenses')
            setBills(res.data)
        }
         catch (error) {
            console.log("Error fetching bills:", error)
        } finally {
            setLoading(false)
        }
    }
        fetchBills()
        
        
    }, [])

    const handleChange = (e) => {
        setBillMonth(e.target.value)
    }

   
         const renderedBills = bills.filter((bill) => new Intl.DateTimeFormat("en-US", {month:"long"}).format(new Date(bill.createdAt)).toLowerCase() === billMonth )
         .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
         .map((item) => {
        const date = new Date(item.createdAt);
        const formatted = new Intl.DateTimeFormat("en-US", {
        day: "numeric",
        month: "2-digit",
        year: "numeric",
        }).format(date);

        
        return (
            
            <div className="flex justify-between items-center bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-md p-2" key={item?._id}>
                <div>
                <div>{item?.title}:</div> 
                <div>{formatted}</div>
                </div>
                <span>${item?.total}</span>
            </div>
        )
    })


    return (
        <>
        {loading ? (<p>Loading bills...</p>) : bills.length > 0 ?
        (  
        <>
        <div className="bills-heading">
            <h2 className="text-2xl font-bold flex items-center gap-[10px]"><LucideDollarSign className="text-purple-400" /> Upcoming Bills</h2>
        <select onChange={handleChange} value={billMonth}>
            <option value="january">January</option>
            <option value="february">February</option>
            <option value="march">March</option>
            <option value="april">April</option>
            <option value="may">May</option>
            <option value="june">June</option>
            <option value="july">July</option>
            <option value="august">August</option>
            <option value="september">September</option>
            <option value="october">October</option>
            <option value="november">November</option>
            <option value="december">December</option>
        </select>
        </div>
        <div className="flex flex-col gap-2">
            
            {renderedBills.length === 0 ? ( 
                <div>
                <p >No bills for this month</p>
                </div>
            ) : (
                <>
                {renderedBills}
                </>
            )}
            

           </div>
           </>
           ) :
        (<p>No upcoming bills yet.</p>)
        }
        </>
    )
}

export default UpcomingBills;