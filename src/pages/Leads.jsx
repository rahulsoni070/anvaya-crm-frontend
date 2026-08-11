import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate, useSearchParams } from "react-router-dom";

function Leads() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [status, setStatus] = useState(searchParams.get("status") || "");
    const [priority, setPriority] = useState(searchParams.get("priority") || "");
    const [salesAgent, setSalesAgent] = useState(searchParams.get("salesAgent") || "");
    const [tags, setTags] = useState(searchParams.get("tags") || "");
    const [sort, setSort] = useState(searchParams.get("sort") || "-createdAt");
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

    const [totalPages, setTotalPages] = useState(1);
    const [leads, setLeads] = useState([]);
    const [salesAgents, setSalesAgents] = useState([]);

    useEffect(() => {
        async function fetchSalesAgents() {
            try {
                const token = localStorage.getItem("token");

                const response = await api.get("/api/agents", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setSalesAgents(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchSalesAgents();
    }, []);

    // Keep the URL query string in sync with the current filters so
    // they survive a refresh and can be shared/bookmarked as a link.
    useEffect(() => {
        const params = {};

        if (search) params.search = search;
        if (status) params.status = status;
        if (priority) params.priority = priority;
        if (salesAgent) params.salesAgent = salesAgent;
        if (tags) params.tags = tags;
        if (sort !== "-createdAt") params.sort = sort;
        if (page !== 1) params.page = page;

        setSearchParams(params, { replace: true });
    }, [search, status, priority, salesAgent, tags, sort, page]);

    useEffect(() => {
        async function fetchLeads() {
            try {
                const token = localStorage.getItem("token");

                const response = await api.get(
                    `/api/leads?search=${search}&status=${status}&priority=${priority}&salesAgent=${salesAgent}&tags=${tags}&sort=${sort}&page=${page}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setLeads(response.data.leads);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error(error);
            }
        }

        fetchLeads();
    }, [search, status, priority, salesAgent, tags, sort, page]);

    return (
        <>
            <div className="page">
                <h1>Leads</h1>

                <button onClick={() => navigate("/leads/new")}>
                    + Add Lead
                </button>

                <input
                    type="text"
                    placeholder="Search leads..."
                    value={search}
                    onChange={(event) => {
                        setSearch(event.target.value);
                        setPage(1);
                    }}
                />

                <select
                    value={status}
                    onChange={(event) => {
                        setStatus(event.target.value);
                        setPage(1);
                    }}
                >
                    <option value="">All Status</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Closed">Closed</option>
                </select>

                <select
                    value={priority}
                    onChange={(event) => {
                        setPriority(event.target.value);
                        setPage(1);
                    }}
                >
                    <option value="">All Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>

                <select
                    value={salesAgent}
                    onChange={(event) => {
                        setSalesAgent(event.target.value);
                        setPage(1);
                    }}
                >
                    <option value="">All Sales Agents</option>
                    {salesAgents.map((agent) => (
                        <option key={agent._id} value={agent._id}>
                            {agent.name}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Filter by tag..."
                    value={tags}
                    onChange={(event) => {
                        setTags(event.target.value);
                        setPage(1);
                    }}
                />

                <select
                    value={sort}
                    onChange={(event) => {
                        setSort(event.target.value);
                        setPage(1);
                    }}
                >
                    <option value="-createdAt">Newest First</option>
                    <option value="createdAt">Oldest First</option>
                    <option value="name">Name A-Z</option>
                    <option value="-name">Name Z-A</option>
                    <option value="timeToClose">Time to Close (soonest)</option>
                    <option value="-timeToClose">Time to Close (furthest)</option>
                </select>

                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Sales Agent</th>
                            <th>Source</th>
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
                                <td>{lead.email}</td>
                                <td>{lead.phone}</td>
                                <td>{lead.status}</td>
                                <td>{lead.priority}</td>
                                <td>{lead.salesAgent?.name}</td>
                                <td>{lead.source || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="page">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </button>

                <span>
                    Page {page} of {totalPages}
                </span>

                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </>
    );
}

export default Leads;