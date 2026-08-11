import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Layout from "./components/Layout";
import Leads from "./pages/Leads";
import SalesAgents from "./pages/SalesAgents";
import CreateLead from "./pages/CreateLead"
import LeadDetails from "./pages/LeadDetails";
import EditLead from "./pages/EditLead";
import Reports from "./pages/Reports"
import Settings from "./pages/Settings"
import CreateAgent from "./pages/CreateAgent"
import AdminRoute from "./components/AdminRoute"
import LeadStatusView from "./pages/LeadStatusView"
import SalesAgentLeadsView from "./pages/SalesAgentLeadsView"

function App() {
  return (
    <>
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<Login/>} />

          <Route path="/register" element={<Register/>} />

          <Route element={<ProtectedRoute><Layout/></ProtectedRoute>}  >
          
          <Route path="/dashboard" element={<Dashboard/>} />

          <Route path="/leads" element={<Leads/>} />

          <Route path="/leads/new" element={<CreateLead/>} />

          <Route path="leads/:id" element={<LeadDetails/>}/>


          <Route path="/sales-agents" element={<SalesAgents/>}/> 

          <Route path="/sales-agents/new" element={<AdminRoute><CreateAgent/></AdminRoute>}/>

          <Route path="/leads/:id/edit"
          element={<EditLead/>} />

          <Route path="/reports" element={<Reports/>} />

          <Route path="/settings" element={<Settings/>} />

          <Route path="/leads/status/:status" element={<LeadStatusView/>} />

          <Route path="/sales-agents/:id/leads" element={<SalesAgentLeadsView/>} />

          </Route>

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App