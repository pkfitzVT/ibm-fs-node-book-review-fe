// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BrowseBooks from "./components/BrowseBooks";
import SearchBooks from "./components/SearchBooks";
import BookDetails from "./components/BookDetails";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import SplashPage from "./components/SplashPage";
import SearchByAuthor from "./components/SearchByAuthor";
import SearchByTitle from "./components/SearchByTitle";


function App() {
    return (
        <Router>
            <header style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
                <nav>
                    <Link to="/" style={{ marginRight: "1rem" }}>Home</Link>
                    <Link to="/browse" style={{ marginRight: "1rem" }}>Browse</Link>
                    <Link to="/search" style={{ marginRight: "1rem" }}>Search</Link>
                    <Link to="/search/author" style={{ marginRight: "1rem" }}>
                        Search (by Author)
                    </Link>
                    <Link to="/search/title" style={{ marginRight: "1rem" }}>
                        Search (by Title)
                    </Link>
                    <Link to="/register" style={{ marginRight: "1rem" }}>Register</Link>
                    <Link to="/login" style={{ marginRight: "1rem" }}>Login</Link>

                </nav>
            </header>
            <main style={{ padding: "1rem" }}>
                <Routes>
                    <Route path="/" element={<SplashPage />} />
                    <Route path="/browse" element={<BrowseBooks />} />
                    <Route path="/search" element={<SearchBooks />} />
                    <Route path="/search/author" element={<SearchByAuthor />} />
                    <Route path="/search/title" element={<SearchByTitle />} />
                    <Route path="/book/:isbn" element={<BookDetails />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/login" element={<LoginForm />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
