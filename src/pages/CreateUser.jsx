import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

function CreateUser() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
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

        try {
            setError("");

            const token = localStorage.getItem("token");

            await api.post(
                "/auth/register",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            navigate("/users");

        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to create user. Please try again."
            );
        }
    };

    return (
        <div className="page create-user-page">

            <div className="page-header">
                <h1>Create User</h1>
                <p>Add a new user to Anvaya CRM</p>
            </div>

            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor="name">Name</label>

                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter user name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
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

                <div>
                    <label htmlFor="password">Password</label>

                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="role">Role</label>

                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="salesAgent">
                            Sales Agent
                        </option>
                    </select>
                </div>

                {error && (
                    <p className="form-error">
                        {error}
                    </p>
                )}

                <button type="submit">
                    Create User
                </button>

            </form>

        </div>
    );
}

export default CreateUser;