// src/components/SearchByAuthor.jsx
import { useState, useEffect } from "react";
import { getBooksByAuthor, getAllBooks } from "../services/api";
import { Link } from "react-router-dom";

export default function SearchByAuthor() {
    const [author, setAuthor] = useState("");
    const [allAuthors, setAllAuthors] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 1) On mount, fetch all books and extract unique authors
    useEffect(() => {
        async function fetchAuthors() {
            try {
                const booksData = await getAllBooks();
                // `booksData` is an object keyed by ISBN: { "978-123": { author, title, ... }, ... }
                const authorsSet = new Set();
                Object.values(booksData).forEach((b) => {
                    if (b.author) authorsSet.add(b.author);
                });
                setAllAuthors(Array.from(authorsSet).sort());
            } catch (err) {
                console.error("Could not load authors for autocomplete:", err);
            }
        }
        fetchAuthors();
    }, []);

    // 2) Search function (as before)
    async function handleSubmit(e) {
        e.preventDefault();
        if (!author.trim()) {
            setError("Please choose or enter an author name.");
            return;
        }
        setLoading(true);
        setError(null);
        setResults([]);
        try {
            const books = await getBooksByAuthor(author.trim());
            setResults(books);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ padding: "1rem" }}>
            <h2>Search by Author</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
                <label>
                    Author:&nbsp;
                    <input
                        list="author-list"
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Start typing author..."
                        style={{ width: "200px" }}
                    />
                    <datalist id="author-list">
                        {allAuthors.map((a) => (
                            <option key={a} value={a} />
                        ))}
                    </datalist>
                </label>
                &nbsp;
                <button type="submit" disabled={loading}>
                    {loading ? "Searching…" : "Search"}
                </button>
            </form>

            {error && <div style={{ color: "red" }}>Error: {error}</div>}

            {loading && <div>Loading results…</div>}

            {!loading && results.length > 0 && (
                <ul>
                    {results.map((book) => (
                        <li key={book.isbn} style={{ marginBottom: "0.5rem" }}>
                            <strong>{book.title}</strong> (ISBN: {book.isbn}) &nbsp;
                            <Link to={`/book/${book.isbn}`}>View Details</Link>
                        </li>
                    ))}
                </ul>
            )}

            {!loading && results.length === 0 && !error && (
                <p>No results to display. Try a different author name.</p>
            )}
        </div>
    );
}
