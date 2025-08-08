import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { FinancesProvider } from './context/FinancesContext.jsx'
import { GoalsProvider } from './context/GoalsContext.jsx'
import { BudgetProvider } from './context/BudgetContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <FinancesProvider>
  <GoalsProvider>
  <BudgetProvider>
  <StrictMode>
    <App />
  </StrictMode>
  </BudgetProvider>
  </GoalsProvider>
  </FinancesProvider>
  </AuthProvider>
)
