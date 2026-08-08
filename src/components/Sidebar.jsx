import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar({ isSidebarOpen }) {
    const role = localStorage.getItem("role")
    return (
        <aside className={isSidebarOpen ? "sidebar open" : "sidebar"}>

    <NavLink
        to="/dashboard"
        className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
        }
    >
        Dashboard
    </NavLink>

    <NavLink
        to="/leads"
        className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
        }
    >
        Leads
    </NavLink>

    <NavLink
        to="/sales-agents"
        className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
        }
    >
        Sales Agents
    </NavLink>

    <NavLink
        to="/reports"
        className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
        }
    >
        Reports
    </NavLink>

    <NavLink
        to="/settings"
        className={({ isActive }) =>
            isActive ? "sidebar-link active" : "sidebar-link"
        }
    >
        Settings
    </NavLink>

</aside>
    )
}

export default Sidebar;