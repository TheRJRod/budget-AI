import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import IncomePage from "./pages/IncomePage";
import ExpensePage from "./pages/ExpensePage";
import FinancesPage from "./pages/FinancesPage";
import GoalsPage from "./pages/GoalsPage";
import PrivateRoute from "./components/PrivateRoute";
import PageWrapper from "./components/PageWrapper";
import { useLocation } from "react-router-dom";

function App() {
  return (
    <Router>
      <WrappedRoutes />
    </Router>
  );
}

function WrappedRoutes() {
  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";

  return (
    <PageWrapper customClass={isDashboard ? "dashNav" : ""}>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/finances" element={<FinancesPage/>} />
          <Route path="/goals" element={<GoalsPage/>} />
        </Route>
      </Routes>
    </PageWrapper>
  );
}

export default App;
