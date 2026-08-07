import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Layout from "./components/Layout";
import Leads from "./pages/Leads";
import SalesAgents from "./pages/SalesAgents";
import CreateLead from "./pages/CreateLead"
import LeadDetails from "./pages/LeadDetails";
import EditLead from "./pages/EditLead";
import CreateUser from "./pages/CreateUser"
import Users from "./pages/Users"
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <>
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<Login/>} />

          <Route element={<ProtectedRoute><Layout/></ProtectedRoute>}  >
          
          <Route path="/dashboard" element={<Dashboard/>} />

          <Route path="/leads" element={<Leads/>} />

          <Route path="/leads/new" element={<CreateUser/>} />

          <Route path="leads/:id" element={<LeadDetails/>}/>


          <Route path="/sales-agents" element={<SalesAgents/>}/> 

          <Route path="/leads/:id/edit"
          element={<EditLead/>} />

          <Route path="/users" element={<AdminRoute><Users/></AdminRoute>}/>
          <Route path="/users/new" element={<AdminRoute><CreateUser/></AdminRoute>} />
          

          </Route>

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
