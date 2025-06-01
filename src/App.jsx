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
import Footer from "./components/Footer";


function App() {
    return (
        /* Full-viewport gradient background + global text colour */
        <div className="min-h-screen bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-gray-100">
            <Router>
                {/* top nav bar */}
                {/* ───-- Sticky top nav bar --── */}
                <header className="bg-transparent sticky-top">
                    <nav
                        className="
      container-fluid
      d-flex justify-content-evenly align-items-center
      py-3
      fw-bold fs-5    /* thicker, larger text */
      text-white
    "
                    >
                        <Link className="nav-link px-2 text-white" to="/">Home</Link>
                        <Link className="nav-link px-2 text-white" to="/browse">Browse</Link>
                        <Link className="nav-link px-2 text-white" to="/search/author">Search (by Author)</Link>
                        <Link className="nav-link px-2 text-white" to="/search/title">Search (by Title)</Link>
                        <Link className="nav-link px-2 text-white" to="/register">Register</Link>
                        <Link className="nav-link px-2 text-white" to="/login">Login</Link>
                    </nav>
                </header>


                {/* main content area */}
                <main className="p-4">
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
            <Footer />
        </div>
    );
}

export default App;
