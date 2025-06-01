// src/components/RegisterForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormMessage from "../components/FormMessage";

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
            // 1) POST to /register…
            const res = await fetch("/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const payload = await res.json(); // { token?, message }

            if (!res.ok) {
                // Backend returned 400 or 409
                setIsError(true);
                setMessage(payload.message || `Error ${res.status}`);
            } else {
                // Registration succeeded
                setIsError(false);
                setMessage(payload.message || "Registered successfully!");
                if (payload.token) {
                    localStorage.setItem("token", payload.token);
                }
                setUsername("");
                setPassword("");
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            }
        } catch (err) {
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
                <FormMessage type={isError ? "error" : "success"}>
                    {message}
                </FormMessage>
            )}
        </div>
    );
}
