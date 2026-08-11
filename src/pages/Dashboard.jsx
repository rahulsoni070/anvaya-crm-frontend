import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/Dashboard.css";

function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);
    const navigate = useNavigate();

    const getDashboardData = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await api.get(
                "/api/dashboard",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setDashboardData(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDashboardData();
    }, []);

    if (!dashboardData) {
        return (
            <div className="page dashboard-loading">
                <h2>Loading...</h2>
            </div>
        );
    }

    return (
        <div className="dashboard-page">

            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Overview of your CRM leads</p>
            </div>

            <div className="dashboard-cards">

                <div className="dashboard-card">
                    <div className="card-icon">👥</div>

                    <div>
                        <p>Total Leads</p>
                        <h2>{dashboardData.totalLeads}</h2>
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-icon">✨</div>

                    <div>
                        <p>New Leads</p>
                        <h2>{dashboardData.newLeads}</h2>
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-icon">📞</div>

                    <div>
                        <p>Contacted Leads</p>
                        <h2>{dashboardData.contactedLeads}</h2>
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-icon">🔥</div>

                    <div>
                        <p>High Priority</p>
                        <h2>{dashboardData.highPriorityLeads}</h2>
                    </div>
                </div>

            </div>

            <div className="dashboard-lower">

                <div className="dashboard-section">
                    <div className="section-header">
                        <h2>Lead Status</h2>
                    </div>

                    <ul className="status-list">
                        <li>
                            <span>New</span>
                            <strong>{dashboardData.newLeads}</strong>
                        </li>
                        <li>
                            <span>Contacted</span>
                            <strong>{dashboardData.contactedLeads}</strong>
                        </li>
                        <li>
                            <span>Qualified</span>
                            <strong>{dashboardData.qualifiedLeads}</strong>
                        </li>
                    </ul>

                    <div className="quick-filters">
                        <span className="quick-filters-label">Quick Filters:</span>
                        <button onClick={() => navigate("/leads/status/New")}>
                            New
                        </button>
                        <button onClick={() => navigate("/leads/status/Contacted")}>
                            Contacted
                        </button>
                    </div>

                    <button
                        className="add-lead-button"
                        onClick={() => navigate("/leads/new")}
                    >
                        + Add New Lead
                    </button>
                </div>

                <div className="dashboard-section">
                    <div className="section-header">
                        <h2>Recent Leads</h2>
                    </div>

                    <ul className="recent-leads-list">
                        {dashboardData.recentLeads.length === 0 && (
                            <li className="recent-leads-empty">No leads yet</li>
                        )}

                        {dashboardData.recentLeads.map((lead) => (
                            <li
                                key={lead._id}
                                onClick={() => navigate(`/leads/${lead._id}`)}
                            >
                                <span>{lead.name}</span>
                                <span
                                    className={`status-badge status-${lead.status.replace(/\s+/g, "")}`}
                                >
                                    {lead.status}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>

        </div>
    );
}

export default Dashboard;