import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/Login.css";

function CreateAgent() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setError("");

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
        <div className="login-page">

            <div className="login-card">

                <div className="login-header">
                    <h1>New Sales Agent</h1>
                    <p>Add a sales agent to Anvaya CRM</p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>

                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter agent name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            minLength={2}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter email address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>

                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Set a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={6}
                        />
                    </div>

                    {error && (
                        <p className="login-error">{error}</p>
                    )}

                    <button type="submit" className="login-button">
                        Create Sales Agent
                    </button>

                </form>

            </div>

        </div>
    );
}

export default CreateAgent;