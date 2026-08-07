import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../utils/api";

function Users() {

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {

        async function fetchUsers() {
            try {
                const token = localStorage.getItem("token");

                const response = await api.get(
                    "/auth/users",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setUsers(response.data);

            } catch (error) {
                console.error(error);
            }
        }

        fetchUsers();

    }, []);

    return (
        <div className="page" >

            <h1>Users</h1>

            <button onClick={() => navigate("/users/new")}>
                + Create User
            </button>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default Users;