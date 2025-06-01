// src/components/BookDetails.jsx

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getBookByIsbn, getReviewsByIsbn } from "../services/api";

export default function BookDetails() {
    const { isbn } = useParams();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [loadingBook, setLoadingBook] = useState(true);
    const [loadingReviews, setLoadingReviews] = useState(true);
    const [errorBook, setErrorBook] = useState(null);
    const [errorReviews, setErrorReviews] = useState(null);

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

    useEffect(() => {
        async function fetchReviews() {
            try {
                const data = await getReviewsByIsbn(isbn);
                setReviews(data);
            } catch (err) {
                setErrorReviews(err.message);
            } finally {
                setLoadingReviews(false);
            }
        }
        fetchReviews();
    }, [isbn]);

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

            {loadingReviews ? (
                <div>Loading reviews…</div>
            ) : errorReviews ? (
                <div style={{ color: "red" }}>Error: {errorReviews}</div>
            ) : Array.isArray(reviews) ? (
                reviews.length > 0 ? (
                    <div>
                        <h3>Reviews:</h3>
                        <ul>
                            {reviews.map((r, idx) => (
                                <li key={idx}>
                                    <strong>{r.user}:</strong> {r.reviewText}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>{reviews.message || "No reviews yet."}</p>
                )
            ) : (
                <p>{reviews.message}</p>
            )}

            <p>
                <Link to="/browse">← Back to Browse</Link>
            </p>
        </div>
    );
}
