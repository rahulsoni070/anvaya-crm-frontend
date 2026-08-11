import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";

function LeadStatusView() {
    const { status } = useParams();
    const navigate = useNavigate();

    const [leads, setLeads] = useState([]);
    const [salesAgents, setSalesAgents] = useState([]);

    const [salesAgentFilter, setSalesAgentFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [sort, setSort] = useState("timeToClose");

    useEffect(() => {
        async function fetchSalesAgents() {
            try {
                const response = await api.get("/api/agents");
                setSalesAgents(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchSalesAgents();
    }, []);

    useEffect(() => {
        async function fetchLeads() {
            try {
                const response = await api.get(
                    `/api/leads?status=${status}&salesAgent=${salesAgentFilter}&priority=${priorityFilter}&sort=${sort}&limit=100`
                );

                setLeads(response.data.leads);
            } catch (error) {
                console.error(error);
            }
        }

        fetchLeads();
    }, [status, salesAgentFilter, priorityFilter, sort]);

    return (
        <div className="page">

            <button onClick={() => navigate("/dashboard")}>
                ← Back to Dashboard
            </button>

            <h1>Leads by Status: {status}</h1>

            <select
                value={salesAgentFilter}
                onChange={(event) => setSalesAgentFilter(event.target.value)}
            >
                <option value="">All Sales Agents</option>
                {salesAgents.map((agent) => (
                    <option key={agent._id} value={agent._id}>
                        {agent.name}
                    </option>
                ))}
            </select>

            <select
                value={priorityFilter}
                onChange={(event) => setPriorityFilter(event.target.value)}
            >
                <option value="">All Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
            >
                <option value="timeToClose">Time to Close (soonest)</option>
                <option value="-timeToClose">Time to Close (furthest)</option>
            </select>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Sales Agent</th>
                        <th>Priority</th>
                        <th>Time to Close</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.map((lead) => (
                        <tr key={lead._id}>
                            <td
                                onClick={() => navigate(`/leads/${lead._id}`)}
                                style={{ cursor: "pointer" }}
                            >
                                {lead.name}
                            </td>
                            <td>{lead.salesAgent?.name || "N/A"}</td>
                            <td>{lead.priority}</td>
                            <td>
                                {lead.timeToClose
                                    ? `${lead.timeToClose} Days`
                                    : "N/A"}
                            </td>
                        </tr>
                    ))}

                    {leads.length === 0 && (
                        <tr>
                            <td colSpan="4">No leads with this status.</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    );
}

export default LeadStatusView;