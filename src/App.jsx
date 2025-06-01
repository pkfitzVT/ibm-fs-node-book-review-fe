// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BrowseBooks from "./components/BrowseBooks";
import SearchBooks from "./components/SearchBooks";
import BookDetails from "./components/BookDetails";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import SplashPage from "./components/SplashPage";

function App() {
    return (
        <Router>
            <header style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
                <nav>
                    <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
                    <Link to="/browse" style={{ marginRight: "1rem" }}>Browse</Link>
                    <Link to="/search" style={{ marginRight: "1rem" }}>Search</Link>
                    <Link to="/login" style={{ marginRight: "1rem" }}>Login</Link>
                    <Link to="/register">Register</Link>
                </nav>
            </header>
            <main style={{ padding: "1rem" }}>
                <Routes>
                    <Route path="/" element={<SplashPage />} />
                    <Route path="/browse" element={<BrowseBooks />} />
                    <Route path="/search" element={<SearchBooks />} />
                    <Route path="/book/:isbn" element={<BookDetails />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
