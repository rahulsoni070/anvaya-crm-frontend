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

          <Route path="/leads/:id/edit"
          element={<EditLead/>} />

          <Route path="/reports" element={<Reports/>} />

          <Route path="/settings" element={<Settings/>} />

          </Route>

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App