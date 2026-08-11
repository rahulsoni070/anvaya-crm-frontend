import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";
import TagsMultiSelect from "../components/TagsMultiSelect";
import "../styles/Createlead.css";

function EditLead() {
    const [salesAgents, setSalesAgents] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const toggleTag = (tag) => {
        setSelectedTags((prev) =>
            prev.includes(tag)
                ? prev.filter((t) => t !== tag)
                : [...prev, tag]
        );
    };

    const handleAddNewTag = (trimmed) => {
        if (!selectedTags.includes(trimmed)) {
            setSelectedTags([...selectedTags, trimmed]);
        }

        if (!availableTags.includes(trimmed)) {
            setAvailableTags([...availableTags, trimmed]);
        }
    };

    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        status: "",
        priority: "",
        salesAgent: "",
        source: "",
        timeToClose: ""
    });

    useEffect(() => {
        async function fetchLead() {
            try {
                const token = localStorage.getItem("token");

                const response = await api.get(
                    `/api/leads/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    phone: response.data.phone,
                    status: response.data.status,
                    priority: response.data.priority,
                    salesAgent: response.data.salesAgent?._id || "",
                    source: response.data.source || "",
                    timeToClose: response.data.timeToClose || ""
                });

                setSelectedTags(response.data.tags || []);

            } catch (error) {
                console.error(error);
            }
        }

        fetchLead();

    }, [id]);


    useEffect(() => {
        async function fetchSalesAgents() {
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

                setSalesAgents(response.data);

            } catch (error) {
                console.error(error);
            }
        }

        fetchSalesAgents();

    }, []);

    useEffect(() => {
        async function fetchTags() {
            try {
                const token = localStorage.getItem("token");

                const response = await api.get(
                    "/api/leads/tags/all",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setAvailableTags(response.data);

            } catch (error) {
                console.error(error);
            }
        }

        fetchTags();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const payload = {
                ...formData,
                tags: selectedTags,
                timeToClose: formData.timeToClose
                    ? Number(formData.timeToClose)
                    : undefined
            };

            await api.put(
                `/api/leads/${id}`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            navigate(`/leads/${id}`);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="create-lead-page">

            <div className="create-lead-card">

                <div className="create-lead-header">
                    <h1>Edit Lead</h1>
                    <p>Update this lead's details</p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                required
                            >
                                <option value="New">New</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Qualified">Qualified</option>
                                <option value="Proposal Sent">Proposal Sent</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Priority</label>
                            <select
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                required
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Sales Agent</label>

                        <select
                            name="salesAgent"
                            value={formData.salesAgent}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Sales Agent</option>

                            {salesAgents.map((agent) => (
                                <option
                                    key={agent._id}
                                    value={agent._id}
                                >
                                    {agent.name} - {agent.email}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Source</label>
                        <select
                            name="source"
                            value={formData.source}
                            onChange={handleChange}
                            required
                        >
                            <option value="Website">Website</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Instagram">Instagram</option>
                            <option value="Referral">Referral</option>
                        </select>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Tags</label>

                            <TagsMultiSelect
                                availableTags={availableTags}
                                selectedTags={selectedTags}
                                onToggleTag={toggleTag}
                                onAddTag={handleAddNewTag}
                            />
                        </div>

                        <div className="form-group">
                            <label>Time to Close (days)</label>
                            <input
                                type="number"
                                name="timeToClose"
                                value={formData.timeToClose}
                                onChange={handleChange}
                                min="0"
                                placeholder="e.g. 30"
                            />
                        </div>
                    </div>

                    <button type="submit" className="create-lead-button">
                        Update Lead
                    </button>

                </form>

            </div>

        </div>
    );
}

export default EditLead;