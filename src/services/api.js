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
