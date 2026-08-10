import { useEffect, useState } from "react";
import {
    PieChart, Pie, Cell, Tooltip, Legend,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";
import api from "../utils/api";
import "../styles/Reports.css";
 
const COLORS = ["#4f46e5", "#f59e0b", "#10b981", "#ef4444", "#3b82f6"];
 
function Reports() {
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
 
    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await api.get("/api/reports");
                setData(response.data);
            } catch (err) {
                setError(
                    err.response?.data?.message || "Failed to load reports"
                );
            }
        };
 
        fetchReports();
    }, []);
 
    if (error) {
        return <p className="reports-error">{error}</p>;
    }
 
    if (!data) {
        return <p className="reports-loading">Loading reports...</p>;
    }
 
    return (
        <div className="reports-page">
            <h1>Reports</h1>
 
            <div className="report-card">
                <h2>Total Leads Closed vs Pipeline</h2>
                <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                        <Pie
                            data={data.closedVsPipeline}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={70}
                            label
                        >
                            {data.closedVsPipeline.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
 
            <div className="report-card">
                <h2>Leads Closed by Sales Agent</h2>
                <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={data.closedBySalesAgent}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="agent" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#4f46e5" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
 
            <div className="report-card">
                <h2>Lead Status Distribution</h2>
                <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={data.statusDistribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="status" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="count" fill="#10b981" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
 
export default Reports;
 
