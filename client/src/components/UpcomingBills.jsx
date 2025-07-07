import { useState, useEffect } from "react";
import API from "../api";

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
        month: "long",
        year: "numeric",
        }).format(date);

        
        return (
            
            <tr key={item?._id}>
                <td>{item?.title}:</td> 
                <td>${item?.total}</td>
                <td>{formatted}</td>
            </tr>
        )
    })


    return (
        <>
        {loading ? (<p>Loading bills...</p>) : bills.length > 0 ?
        (  
        <>
        <div className="bills-heading">
            <h2>Upcoming Bills</h2>
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
        <table>
            <tbody>
            {renderedBills.length === 0 ? ( 
                <tr>
                <td colSpan="3">No bills for this month</td>
                </tr>
            ) : (
                <>
                <tr style={{borderBottom:'1px solid black'}}>
                    <td style={{fontWeight:'bold', fontSize:20}}>Bill</td>
                    <td style={{fontWeight:'bold', fontSize:20}}>Total</td>
                    <td style={{fontWeight:'bold', fontSize:20}}>Date</td>
                </tr>
                {renderedBills}
                </>
            )}
            </tbody>

           </table>
           </>
           ) :
        (<p>No upcoming bills yet.</p>)
        }
        </>
    )
}

export default UpcomingBills;