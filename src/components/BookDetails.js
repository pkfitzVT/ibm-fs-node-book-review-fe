// src/components/BookDetails.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getBookByIsbn, getReviewsByIsbn } from "../services/api";
import ReviewForm from "./ReviewForm";

export default function BookDetails() {
    const { isbn } = useParams();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [loadingBook, setLoadingBook] = useState(true);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [errorBook, setErrorBook] = useState(null);
    const [errorReviews, setErrorReviews] = useState(null);

    // Fetch book data
    useEffect(() => {
        async function fetchBook() {
            try {
                const data = await getBookByIsbn(isbn);
                setBook(data);
            } catch (err) {
                setErrorBook(err.message);
            } finally {
                setLoadingBook(false);
            }
        }
        fetchBook();
    }, [isbn]);

    // Fetch reviews
    async function loadReviews() {
        setLoadingReviews(true);
        setErrorReviews(null);
        try {
            const data = await getReviewsByIsbn(isbn);
            setReviews(data);
        } catch (err) {
            setErrorReviews(err.message);
        } finally {
            setLoadingReviews(false);
        }
    }

    useEffect(() => {
        loadReviews();
    }, [isbn]);

    // Helper to detect if user is “logged in”
    // We assume a JWT is stored in localStorage under “token”.
    // (Your backend actually checks the session cookie, but for simplicity we gate the UI by token presence.)
    const isLoggedIn = Boolean(localStorage.getItem("token"));

    if (loadingBook) return <div>Loading book details…</div>;
    if (errorBook) return <div style={{ color: "red" }}>Error: {errorBook}</div>;
    if (!book) return <div>Book not found.</div>;

    return (
        <div style={{ padding: "1rem" }}>
            <h2>{book.title}</h2>
            <p>
                <strong>Author:</strong> {book.author}
            </p>
            <p>
                <strong>ISBN:</strong> {isbn}
            </p>
            {book.description && (
                <p>
                    <strong>Description:</strong> {book.description}
                </p>
            )}

            <hr />

            {/* Reviews Section */}
            <h3>Reviews</h3>
            {loadingReviews ? (
                <div>Loading reviews…</div>
            ) : errorReviews ? (
                <div style={{ color: "red" }}>Error: {errorReviews}</div>
            ) : Array.isArray(reviews) ? (
                reviews.length > 0 ? (
                    <ul>
                        {reviews.map((r, idx) => (
                            <li key={idx} style={{ marginBottom: "0.5rem" }}>
                                <strong>{r.user}:</strong> {r.reviewText}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No reviews yet. Be the first to review!</p>
                )
            ) : (
                // When the backend returns a “message” instead of an array:
                <p>{reviews.message}</p>
            )}

            {/* Review Form or Prompt to Log In */}
            {isLoggedIn ? (
                <ReviewForm isbn={isbn} onReviewSubmitted={loadReviews} />
            ) : (
                <p>
                    <Link to="/login">Log in</Link> to add or modify your review.
                </p>
            )}

            <p>
                <Link to="/browse">← Back to Browse</Link>
            </p>
        </div>
    );
}
