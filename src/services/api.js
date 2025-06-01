// src/services/api.js

// (Make sure this file already has the proxy working, so BASE_URL = "".)

/**
 * Fetch all books (GET "/")
 * Returns the full `books` object/array from the backend.
 */
export async function getAllBooks() {
    // THIS is fetching React's index.html
    // const res = await fetch("/");

    // INSTEAD, call the Axios-wrapped route:
    const res = await fetch("/axios/books");
    if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
    return res.json();
}
/**
 * GET /isbn/:isbn
 * Returns the book object for the given ISBN.
 */
export async function getBookByIsbn(isbn) {
    // CRA’s proxy will forward “/isbn/…” to http://localhost:5000/isbn/…
    const res = await fetch(`/isbn/${encodeURIComponent(isbn)}`);
    if (!res.ok) {
        // Try to parse a JSON error message if the backend sent one
        let errMsg = `Error ${res.status}`;
        try {
            const errPayload = await res.json();
            if (errPayload && errPayload.message) {
                errMsg = errPayload.message;
            }
        } catch {
            /* ignore parse errors */
        }
        throw new Error(errMsg);
    }
    return res.json(); // the single book object
}

/**
 * GET /review/:isbn
 * Returns either a “please review” message or an array of review objects.
 */
export async function getReviewsByIsbn(isbn) {
    const res = await fetch(`/review/${encodeURIComponent(isbn)}`);
    if (!res.ok) {
        const errPayload = await res.json().catch(() => ({}));
        throw new Error(errPayload.message || `Error ${res.status}`);
    }
    return res.json(); // either { message: "Please review ..." } or [ { user, reviewText }, ... ]
}
