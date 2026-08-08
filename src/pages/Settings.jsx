import { useEffect, useState } from "react";
import "../styles/Settings.css";

function Settings() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) {
            setUser(JSON.parse(stored));
        }
    }, []);

    if (!user) {
        return <p className="settings-loading">Loading...</p>;
    }

    return (
        <div className="settings-page">
            <h1>Settings</h1>

            <div className="settings-card">
                <h2>Account Details</h2>

                <div className="settings-row">
                    <span className="settings-label">Name</span>
                    <span>{user.name}</span>
                </div>

                <div className="settings-row">
                    <span className="settings-label">Email</span>
                    <span>{user.email}</span>
                </div>

                <div className="settings-row">
                    <span className="settings-label">Role</span>
                    <span>{user.role}</span>
                </div>
            </div>
        </div>
    );
}

export default Settings;