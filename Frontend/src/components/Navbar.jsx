import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logout } from "../redux/reducers/Auth";
import { setBooks } from "../redux/reducers/Book";
import axios from "axios";
import { API_BASE_URL } from "../config";

const Navbar = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  console.log(user) // ✅ Get user from Redux store
  const books = useSelector((state) => state.books.books);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  // ✅ Fetch books when component mounts
  useEffect(() => {
    axios.get(`${API_BASE_URL}/books`)
      .then((res) => dispatch(setBooks(res.data)))
      .catch((err) => console.error("Error fetching books:", err));
  }, [dispatch]);

  // ✅ Search books by title
  useEffect(() => {
    if (search.trim() !== "") {
      const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
      );
      dispatch(setBooks(filteredBooks));
    } else {
      axios.get(`${API_BASE_URL}/books`)
        .then((res) => dispatch(setBooks(res.data)))
        .catch((err) => console.error("Error fetching books:", err));
    }
  }, [search, dispatch]);

  // ✅ Sort books by year
  const handleSort = () => {
    const sortedBooks = [...books].sort((a, b) =>
      sortOrder === "asc" ? a.year - b.year : b.year - a.year
    );
    dispatch(setBooks(sortedBooks));
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // ✅ Toggle Dark/Light Mode (With LocalStorage)
  useEffect(() => {
    if (darkMode) {
      document.body.style.backgroundColor = "#121212";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "#f8f9fa";
      document.body.style.color = "#333";
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 20px",
        backgroundColor: darkMode ? "#222" : "#007bff",
        color: "white",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        position: "sticky",
        top: "0",
        zIndex: "1000",
        flexWrap: "wrap"
      }}
    >
      <Link to="/dashboard" style={{ color: "white", fontWeight: "bold", textDecoration: "none" }}>
        📚 Library
      </Link>

      {token ? (
        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
          <input
            type="text"
            placeholder="Search books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "none",
              outline: "none",
              width: "180px"
            }}
          />
         <button
  onClick={handleSort}
  style={{
    padding: "10px 20px",
    borderRadius: "8px",
    backgroundColor: sortOrder === "asc" ? "#007bff" : "#e74c3c", // Blue for ascending, Red for descending
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  }}
  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
>
  {sortOrder === "asc" ? (
    <span role="img" aria-label="ascending">⬆️</span> // Up arrow for ascending
  ) : (
    <span role="img" aria-label="descending">⬇️</span> // Down arrow for descending
  )}
  Sort {sortOrder === "asc" ? "Ascending" : "Descending"}
</button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              padding: "8px 12px",
              borderRadius: "5px",
              backgroundColor: darkMode ? "#ffcc00" : "#444",
              color: darkMode ? "#222" : "white",
              border: "none",
              cursor: "pointer"
            }}
          >
            {darkMode ? "🌙 Dark Mode" : "☀ Light Mode"}
          </button>
          

          {/* ✅ "Create Book" Button for Admin Only */}
          {user?.role === "admin" && (
            <Link
              to="/add-book"
              style={{
                textDecoration: "none",
                padding: "8px 12px",
                borderRadius: "5px",
                backgroundColor: "#28a745",
                color: "white",
              }}
            >
              ➕ Create Book
            </Link>
          )}

          <button
            onClick={() => dispatch(logout())}
            style={{
              padding: "8px 12px",
              borderRadius: "5px",
              backgroundColor: "#ff4d4d",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            padding: "8px 12px",
            borderRadius: "5px",
            backgroundColor: "white",
            color: "#007bff"
          }}
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
