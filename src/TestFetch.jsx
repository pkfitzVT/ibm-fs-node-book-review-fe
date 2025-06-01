import { useState, useEffect } from "react";

export default function TestFetch() {
    const [message, setMessage] = useState("Loading...");
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/api/health")
            .then(res => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then(data => {
                setMessage(data.status || "Received response");
            })
            .catch(err => {
                setError(err.message);
            });
    }, []);

    if (error) return <div style={{ color: "red" }}>Error: {error}</div>;
    return <div>Backend says: {message}</div>;
}
