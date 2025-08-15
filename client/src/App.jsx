import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import { AuthPage } from "./pages/AuthPage";
import FinancesPage from "./pages/FinancesPage";
import GoalsPage from "./pages/GoalsPage";
import BudgetPage from "./pages/BudgetPage";
import AiRecsPage from "./pages/AiRecsPage";
import PrivateRoute from "./components/PrivateRoute";
import PageWrapper from "./components/PageWrapper";
import Onboarding from "./pages/Onboarding";
import Landing from "./pages/LandingPage";

function App() {
  return (
    <Router>
     <Routes>
  {/* Public routes */}
  <Route path="/landing" element={<Landing />} />
  <Route path="/auth" element={<AuthPage />} />
  <Route path="/" element={
    localStorage.getItem("token") 
      ? <Navigate to="/dashboard" /> 
      : <Navigate to="/auth" />
  } />
  
  {/* Private routes: Protect first, then wrap */}
  <Route element={<PrivateRoute />}>
  <Route path="/onboarding" element={<Onboarding/>} />
    <Route element={<PageWrapper />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/finances" element={<FinancesPage />} />
      <Route path="/goals" element={<GoalsPage />} />
      <Route path="/budget" element={<BudgetPage />} />
      <Route path="/ai-finance" element={<AiRecsPage />} />
      
    </Route>
  </Route>
</Routes>

    </Router>
  );
}

export default App;
