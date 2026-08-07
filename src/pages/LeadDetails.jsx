import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function LeadDetails() {

    const { id } = useParams();
    const navigate = useNavigate()
    const [lead, setLead] = useState(null);

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

                setLead(response.data);

            } catch (error) {
                console.error(error);
            }
        }

        fetchLead();

    }, [id]);

    const handleDelete = async () => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this lead?"
    );

    if (!confirmDelete) {
        return;
    }

    try {
        const token = localStorage.getItem("token");

        await api.delete(
            `/api/leads/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        navigate("/leads");

    } catch (error) {
        console.error(error);
    }
};

    return (
        <>
            <h1>Lead Details</h1>

            {lead && (
                <div>
                    <p>Name: {lead.name}</p>
                    <p>Email: {lead.email}</p>
                    <p>Phone: {lead.phone}</p>
                    <p>Status: {lead.status}</p>
                    <p>Priority: {lead.priority}</p>
                    <p>Sales Agent: {lead.salesAgent?.name || "N/A"}</p>
                    <p>Source: {lead.source || "N/A"}</p>
                </div>
            )}

            <button
            onClick={() => navigate(`/leads/${id}/edit`)}
            >Edit Lead</button>
<button onClick={handleDelete}>
    Delete Lead
</button>

        </>
    );
}
export default LeadDetails;