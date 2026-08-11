import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

function SalesAgents() {
    const [agents, setAgents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchAgents() {
            try {
                const token = localStorage.getItem("token");

                const response = await api.get("/api/agents", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setAgents(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchAgents();
    }, []);

    return (
        <div className="page">
            <h1>Sales Agents</h1>

            <button onClick={() => navigate("/sales-agents/new")}>
                + Add Sales Agent
            </button>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Assigned Leads</th>
                    </tr>
                </thead>

                <tbody>
                    {agents.map((agent) => (
                        <tr key={agent._id}>
                            <td
                                onClick={() => navigate(`/sales-agents/${agent._id}/leads`)}
                                style={{ cursor: "pointer" }}
                            >
                                {agent.name}
                            </td>
                            <td>{agent.email}</td>
                            <td>{agent.assignedLeads}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SalesAgents;