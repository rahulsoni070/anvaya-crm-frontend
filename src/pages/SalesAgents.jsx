import { useEffect, useState } from "react";
import axios from "axios";
import api from "../utils/api";

function SalesAgents() {
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        async function fetchAgents() {
            try {
                const token = localStorage.getItem("token");

                const response = await api.get(
                    "/api/agents",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

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
                            <td>{agent.name}</td>
                            <td>{agent.email}</td>
                            <td>
                                {agent.assignedLeads}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SalesAgents;