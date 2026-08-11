import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";

function SalesAgentLeadsView() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [agentName, setAgentName] = useState("");
    const [leads, setLeads] = useState([]);

    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [sort, setSort] = useState("timeToClose");

    useEffect(() => {
        async function fetchAgentName() {
            try {
                const response = await api.get("/api/agents");
                const match = response.data.find((agent) => agent._id === id);
                setAgentName(match ? match.name : "Sales Agent");
            } catch (error) {
                console.error(error);
            }
        }

        fetchAgentName();
    }, [id]);

    useEffect(() => {
        async function fetchLeads() {
            try {
                const response = await api.get(
                    `/api/leads?salesAgent=${id}&status=${statusFilter}&priority=${priorityFilter}&sort=${sort}&limit=100`
                );

                setLeads(response.data.leads);
            } catch (error) {
                console.error(error);
            }
        }

        fetchLeads();
    }, [id, statusFilter, priorityFilter, sort]);

    return (
        <div className="page">

            <button onClick={() => navigate("/dashboard")}>
                ← Back to Dashboard
            </button>

            <h1>Leads by Sales Agent: {agentName}</h1>

            <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
            >
                <option value="">All Status</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Closed">Closed</option>
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
                        <th>Status</th>
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
                            <td>{lead.status}</td>
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
                            <td colSpan="4">No leads assigned to this agent.</td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    );
}

export default SalesAgentLeadsView;