// src/components/SearchByTitle.jsx
import { useState, useEffect } from "react";
import { getBooksByTitle, getAllBooks } from "../services/api";
import { Link } from "react-router-dom";

export default function SearchByTitle() {
    const [title, setTitle] = useState("");
    const [allTitles, setAllTitles] = useState([]); // for autocomplete
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 1) On mount, fetch all books and extract unique titles for autocomplete
    useEffect(() => {
        async function fetchTitles() {
            try {
                const booksData = await getAllBooks();
                // booksData is an object keyed by ISBN. We extract book.title:
                const titlesSet = new Set();
                Object.values(booksData).forEach((b) => {
                    if (b.title) titlesSet.add(b.title);
                });
                setAllTitles(Array.from(titlesSet).sort());
            } catch (err) {
                console.error("Could not load titles for autocomplete:", err);
            }
        }
        fetchTitles();
    }, []);

    // 2) Handle form submission (search by title)
    async function handleSubmit(e) {
        e.preventDefault();
        if (!title.trim()) {
            setError("Please enter a book title.");
            return;
        }
        setLoading(true);
        setError(null);
        setResults([]);
        try {
            const books = await getBooksByTitle(title.trim());
            setResults(books);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ padding: "1rem" }}>
            <h2>Search by Title</h2>
            <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
                <label>
                    Title:&nbsp;
                    <input
                        list="title-list"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Start typing book title..."
                        style={{ width: "200px" }}
                    />
                    <datalist id="title-list">
                        {allTitles.map((t) => (
                            <option key={t} value={t} />
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
                            <strong>{book.title}</strong> by {book.author} &nbsp;
                            <Link to={`/book/${book.isbn}`}>View Details</Link>
                        </li>
                    ))}
                </ul>
            )}

            {!loading && results.length === 0 && !error && (
                <p>No results found. Try a different title.</p>
            )}
        </div>
    );
}
