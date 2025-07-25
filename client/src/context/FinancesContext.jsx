import { useState, useEffect, useContext, createContext } from "react";
import API from "../api";
const FinancesContext = createContext()

export const useFinances = () => useContext(FinancesContext)

export const FinancesProvider = ({children}) => {
    const [income, setIncome] = useState([])
    const [expenses, setExpenses] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchFinances = async () => {
    try {
      
      const resInc = await API.get("/income");
      const resExp = await API.get("/expenses");
      setIncome(resInc.data);
      setExpenses(resExp.data);
    } catch (error) {
      console.log("Error fetching finances:", error);
    } 
  };

  useEffect(() => {
    setLoading(true);
    fetchFinances().finally(() => setLoading(false))
  }, []);


  const postFinance = (endpoint, form) => {
   return API.post(endpoint, form)
  }

    return (
        <FinancesContext.Provider value={{income, expenses, setIncome, setExpenses, loading, refreshFinances: fetchFinances, postFinance}}>
            {children}
        </FinancesContext.Provider>
    )


}