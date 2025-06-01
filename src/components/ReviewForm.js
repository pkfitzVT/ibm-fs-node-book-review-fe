// src/components/ReviewForm.jsx
import { useState } from "react";

export default function ReviewForm({ isbn, onReviewSubmitted }) {
    const [reviewText, setReviewText] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        if (!reviewText.trim()) {
            setIsError(true);
            setMessage("Please enter some review text.");
            return;
        }

        setLoading(true);
        setMessage("");
        setIsError(false);

        try {
            // PUT /customer/auth/review/:isbn?review=<text>
            // We include credentials so the session cookie (set at login) is sent.
            const res = await fetch(
                `/customer/auth/review/${encodeURIComponent(isbn)}?review=${encodeURIComponent(
                    reviewText.trim()
                )}`,
                {
                    method: "PUT",
                    credentials: "include",
                }
            );
            const payload = await res.json();

            if (!res.ok) {
                setIsError(true);
                setMessage(payload.message || `Error ${res.status}`);
            } else {
                setIsError(false);
                setMessage(payload.message || "Review submitted!");
                setReviewText("");
                // Let the parent BookDetails re-fetch reviews if needed
                if (typeof onReviewSubmitted === "function") {
                    onReviewSubmitted();
                }
            }
        } catch (err) {
            setIsError(true);
            setMessage("Unexpected error. Please try again.");
            console.error("Review submission error:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ marginTop: "1rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "4px" }}>
            <h3>Add / Update Your Review</h3>
            <form onSubmit={handleSubmit}>
        <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review here..."
            rows={4}
            style={{ width: "100%", padding: "0.5rem" }}
            disabled={loading}
        />
                <button
                    type="submit"
                    disabled={loading}
                    style={{ marginTop: "0.5rem", padding: "0.5rem 1rem" }}
                >
                    {loading ? "Submitting…" : "Submit Review"}
                </button>
            </form>
            {message && (
                <div
                    style={{
                        marginTop: "0.5rem",
                        color: isError ? "red" : "green",
                        whiteSpace: "pre-wrap",
                    }}
                >
                    {message}
                </div>
            )}
        </div>
    );
}
