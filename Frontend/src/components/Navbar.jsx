import { Link, useNavigate } from "react-router-dom";
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
 
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  // ✅ Fetch books when component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
  
        if (!token) {
          console.log("⚠ No token found. Redirecting to login...");
          navigate("/login");
          return;
        }
  
        const res = await axios.get(`${API_BASE_URL}/books`, {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Send token
        });
  
        // console.log("✅ API Response:", res.data);
        dispatch(setBooks(res.data || []));
      } catch (error) {
        console.error("❌ Error fetching books:", error.response?.data || error);
      }
    };
  
    fetchBooks();
  }, [dispatch, navigate]);
  

  // ✅ Search books by title


  // ✅ Sort books by year


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
