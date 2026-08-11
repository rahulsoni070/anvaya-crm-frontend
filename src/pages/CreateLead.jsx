import { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import TagsMultiSelect from "../components/TagsMultiSelect";
import "../styles/Createlead.css";

const NAME_REGEX = /^[A-Za-z\s]{2,50}$/;
const PHONE_REGEX = /^[0-9]{10}$/;

function CreateLead() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        status: "New",
        priority: "Medium",
        salesAgent: "",
        source: "",
        timeToClose: ""
    });

    const [error, setError] = useState("");
    const [salesAgents, setSalesAgents] = useState([]);
    const [availableTags, setAvailableTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === "phone") {
            const digitsOnly = value.replace(/\D/g, "");
            setFormData({
                ...formData,
                phone: digitsOnly
            });
            return;
        }

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        if (!NAME_REGEX.test(formData.name.trim())) {
            setError("Name must be 2-50 letters (no numbers or symbols).");
            return;
        }

        if (!PHONE_REGEX.test(formData.phone.trim())) {
            setError("Phone number must be exactly 10 digits.");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            const payload = {
                ...formData,
                tags: selectedTags,
                timeToClose: formData.timeToClose
                    ? Number(formData.timeToClose)
                    : undefined
            };

            await api.post(
                "/api/leads",
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            navigate("/leads");
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.message ||
                "Failed to create lead. Please try again."
            );
        }
    };

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

    return (
        <div className="create-lead-page">

            <div className="create-lead-card">

                <div className="create-lead-header">
                    <h1>Create Lead</h1>
                    <p>Add a new lead to the pipeline</p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter lead name"
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
                            placeholder="Enter email address"
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
                            placeholder="10-digit phone number"
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
                                <option key={agent._id} value={agent._id}>
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
                            <option value="">Select Source</option>
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

                    {error && (
                        <p className="create-lead-error">{error}</p>
                    )}

                    <button type="submit" className="create-lead-button">
                        Create Lead
                    </button>

                </form>

            </div>

        </div>
    );
}

export default CreateLead;