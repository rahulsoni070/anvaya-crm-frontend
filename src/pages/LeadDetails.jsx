import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";

function LeadDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [lead, setLead] = useState(null);

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loadingComments, setLoadingComments] = useState(true);

    useEffect(() => {
        async function fetchLead() {
            try {
                const response = await api.get(`/api/leads/${id}`);

                setLead(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchLead();
    }, [id]);

    useEffect(() => {
        async function fetchComments() {
            try {
                setLoadingComments(true);

                const response = await api.get("/api/comments");

                const leadComments = response.data.filter(
                    (comment) => comment.lead?._id === id
                );

                setComments(leadComments);
            } catch (error) {
                console.error(error);
            } finally {
                setLoadingComments(false);
            }
        }

        fetchComments();
    }, [id]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this lead?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete(`/api/leads/${id}`);

            navigate("/leads");
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddComment = async (event) => {
        event.preventDefault();

        if (!newComment.trim()) {
            return;
        }

        if (!lead?.salesAgent?._id) {
            alert("No sales agent is assigned to this lead.");
            return;
        }

        try {
            const response = await api.post("/api/comments", {
                comment: newComment,
                agent: lead.salesAgent._id,
                lead: id
            });

            setComments((previousComments) => [
            ...previousComments,
            {
                ...response.data,
                agent: lead.salesAgent
            }
        ]);

            setNewComment("");
        } catch (error) {
            console.error(error);
            alert("Failed to add comment.");
        }
    };

    if (!lead) {
        return (
            <div className="page">
                <h1>Lead Details</h1>
                <p>Loading lead...</p>
            </div>
        );
    }

    return (
        <div className="page lead-details-page">

            <h1>Lead Details</h1>

        
            <div className="card lead-details-card">

                <div className="lead-details-grid">

                    <div className="lead-detail-item">
                        <strong>Name</strong>
                        <span>{lead.name}</span>
                    </div>

                    <div className="lead-detail-item">
                        <strong>Email</strong>
                        <span>{lead.email}</span>
                    </div>

                    <div className="lead-detail-item">
                        <strong>Phone</strong>
                        <span>{lead.phone || "N/A"}</span>
                    </div>

                    <div className="lead-detail-item">
                        <strong>Status</strong>
                        <span>{lead.status || "N/A"}</span>
                    </div>

                    <div className="lead-detail-item">
                        <strong>Priority</strong>
                        <span>{lead.priority || "N/A"}</span>
                    </div>

                    <div className="lead-detail-item">
                        <strong>Sales Agent</strong>
                        <span>
                            {lead.salesAgent?.name || "N/A"}
                        </span>
                    </div>

                    <div className="lead-detail-item">
                        <strong>Source</strong>
                        <span>
                            {lead.source || "N/A"}
                        </span>
                    </div>

                    <div className="lead-detail-item">
                        <strong>Time to Close</strong>
                        <span>
                            {lead.timeToClose ? `${lead.timeToClose} Days` : "N/A"}
                        </span>
                    </div>

                    <div className="lead-detail-item">
                        <strong>Tags</strong>
                        <span>
                            {lead.tags && lead.tags.length > 0
                                ? lead.tags.join(", ")
                                : "N/A"}
                        </span>
                    </div>

                </div>

         
                <div className="lead-details-actions">

                    <button
                        onClick={() =>
                            navigate(`/leads/${id}/edit`)
                        }
                    >
                        Edit Lead
                    </button>

                    <button
                        className="delete-button"
                        onClick={handleDelete}
                    >
                        Delete Lead
                    </button>

                </div>

            </div>


            <div className="card comments-card">

                <h2>Comments</h2>

                {loadingComments ? (

                    <p>Loading comments...</p>

                ) : comments.length === 0 ? (

                    <p className="no-comments">
                        No comments yet.
                    </p>

                ) : (

                    <div className="comments-list">

                        {comments.map((item) => (

                            <div
                                className="comment-item"
                                key={item._id}
                            >

                                <div className="comment-header">

                                    <strong>
    {item.agent?.name || lead.salesAgent?.name || "Sales Agent"}
</strong>

                                    <span>
                                        {item.createdAt
                                            ? new Date(
                                                item.createdAt
                                            ).toLocaleString()
                                            : ""}
                                    </span>

                                </div>

                                <p>
                                    {item.comment}
                                </p>

                            </div>

                        ))}

                    </div>
                )}

         
                <form
                    className="comment-form"
                    onSubmit={handleAddComment}
                >

                    <label htmlFor="comment">
                        Add Comment
                    </label>

                    <textarea
                        id="comment"
                        value={newComment}
                        onChange={(event) =>
                            setNewComment(event.target.value)
                        }
                        placeholder="Write a comment..."
                        rows="4"
                        required
                    />

                    <button type="submit">
                        Add Comment
                    </button>

                </form>

            </div>

        </div>
    );
}

export default LeadDetails;