// src/components/RegisterForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");      // success or error text
    const [isError, setIsError] = useState(false);   // toggle red styling
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setIsError(false);

        try {
            // 1) POST to /register (CRA proxies to http://localhost:5000/register)
            const res = await fetch("/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const payload = await res.json(); // { token?, message }

            if (!res.ok) {
                // Backend returned 400 or 409 with { message: “…” }
                setIsError(true);
                setMessage(payload.message || `Error ${res.status}`);
            } else {
                // Registration succeeded
                setIsError(false);
                setMessage(payload.message || "Registered successfully!");
                if (payload.token) {
                    // Save JWT in localStorage if you want to auto‐log in:
                    localStorage.setItem("token", payload.token);
                }
                // Clear form fields
                setUsername("");
                setPassword("");
                // Redirect to login page after a short delay (or immediately)
                setTimeout(() => {
                    navigate("/login");
                }, 1000); // 1s delay so user can read the success message
            }
        } catch (err) {
            // Network or unexpected error
            setIsError(true);
            setMessage("Unexpected error. Please try again.");
            console.error("Register error:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ padding: "1rem", maxWidth: "300px" }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "0.5rem" }}>
                    <label style={{ display: "block" }}>
                        Username:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ width: "100%", padding: "0.25rem" }}
                            required
                        />
                    </label>
                </div>
                <div style={{ marginBottom: "0.5rem" }}>
                    <label style={{ display: "block" }}>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: "100%", padding: "0.25rem" }}
                            required
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    style={{ padding: "0.5rem", width: "100%" }}
                >
                    {loading ? "Registering…" : "Register"}
                </button>
            </form>

            {message && (
                <div
                    style={{
                        marginTop: "1rem",
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
