import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";
import "../styles/Login.css";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("salesAgent");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const registerUser = async (event) => {
        event.preventDefault();

        try {
            setError("");

            await api.post(
                "/auth/register",
                {
                    name,
                    email,
                    password,
                    role
                }
            );

            navigate("/login", { replace: true });

        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Registration failed. Please try again."
            );
        }
    };

    return (
        <div className="login-page">

            <div className="login-card">

                <div className="login-header">
                    <h1>Anvaya CRM</h1>
                    <p>Create an account to get started</p>
                </div>

                <form onSubmit={registerUser}>

                    <div className="form-group">
                        <label htmlFor="name">Name</label>

                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>

                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>

                        <input
                            type="password"
                            id="password"
                            placeholder="Create a password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="role">Register as</label>

                        <select
                            id="role"
                            value={role}
                            onChange={(event) =>
                                setRole(event.target.value)
                            }
                        >
                            <option value="salesAgent">Sales Agent</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {error && (
                        <p className="login-error">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="login-button"
                    >
                        Create Account
                    </button>

                </form>

                <p className="login-footer-link">
                    Already have an account? <Link to="/login">Login</Link>
                </p>

            </div>

        </div>
    );
}

export default Register;
