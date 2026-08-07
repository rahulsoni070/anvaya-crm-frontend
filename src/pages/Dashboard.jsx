import { useState, useEffect } from "react";
import axios from "axios";
import api from "../utils/api";
import "../styles/Dashboard.css";

function Dashboard() {
    const [dashboardData, setDashboardData] = useState(null);

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

            console.log(response.data);
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
            <div className="dashboard-page">
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

        </div>
    );
}

export default Dashboard;