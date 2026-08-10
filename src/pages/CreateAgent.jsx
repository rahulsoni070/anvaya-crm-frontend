import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/Createlead.css";

const NAME_REGEX = /^[A-Za-z\s]{2,50}$/;

function CreateAgent() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: ""
    });

    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        if (!NAME_REGEX.test(formData.name.trim())) {
            setError("Name must be 2-50 letters (no numbers or symbols).");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            await api.post(
                "/api/agents",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            navigate("/sales-agents");
        } catch (err) {
            console.error(err);
            setError(
                err.response?.data?.message ||
                "Failed to create sales agent. Please try again."
            );
        }
    };

    return (
        <div className="create-lead-page">

            <div className="create-lead-card">

                <div className="create-lead-header">
                    <h1>Add Sales Agent</h1>
                    <p>Create a new sales agent</p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter agent name"
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

                    {error && (
                        <p className="create-lead-error">{error}</p>
                    )}

                    <button type="submit" className="create-lead-button">
                        Create Agent
                    </button>

                </form>

            </div>

        </div>
    );
}

export default CreateAgent;