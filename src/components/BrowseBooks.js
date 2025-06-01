// src/components/BrowseBooks.jsx
import { useState, useEffect } from "react";
import { getAllBooks } from "../services/api";

export default function BrowseBooks() {
    const [booksData, setBooksData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const data = await getAllBooks();
                // `data` should be the entire books object keyed by ISBN
                setBooksData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchBooks();
    }, []);

    if (loading) {
        return <div>Loading books…</div>;
    }
    if (error) {
        return <div style={{ color: "red" }}>Error: {error}</div>;
    }

    // `booksData` is an object like { "978-123": { title: "...", author: "...", … }, … }
    const isbnList = Object.keys(booksData);

    return (
        <div style={{ padding: "1rem" }}>
            <h2>All Books</h2>
            <ul>
                {isbnList.map((isbn) => {
                    const book = booksData[isbn];
                    return (
                        <li key={isbn} style={{ marginBottom: "0.5rem" }}>
                            <strong>{book.title}</strong> by {book.author} &nbsp;
                            <a href={`/book/${isbn}`}>View Details</a>
                        </li>
                    );
                })}
            </ul>
            {isbnList.length === 0 && <p>No books available.</p>}
        </div>
    );
}
