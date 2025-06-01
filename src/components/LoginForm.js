// src/components/LoginForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");    // success or error
    const [isError, setIsError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setIsError(false);

        try {
            // 1) POST to /customer/login
            const res = await fetch("/customer/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const payload = await res.json(); // { message, accessToken }

            if (!res.ok) {
                // Show returned error message
                setIsError(true);
                setMessage(payload.message || `Error ${res.status}`);
            } else {
                // Login succeeded
                setIsError(false);
                setMessage(payload.message || "Login successful!");
                // Save JWT for future protected requests
                if (payload.accessToken) {
                    localStorage.setItem("token", payload.accessToken);
                }
                // Clear form fields
                setUsername("");
                setPassword("");
                // Redirect to browse (or any protected route) after a short delay
                setTimeout(() => {
                    navigate("/browse");
                }, 500);
            }
        } catch (err) {
            setIsError(true);
            setMessage("Unexpected error. Please try again.");
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{ padding: "1rem", maxWidth: "300px" }}>
            <h2>Login</h2>
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
                    {loading ? "Logging in…" : "Login"}
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
