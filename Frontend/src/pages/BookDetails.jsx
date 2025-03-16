import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../config";

const BookDetails = () => {
  const { id } = useParams(); // Get book ID from URL
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  const user = useSelector((state) => state.auth.user); // Get logged-in user
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE_URL}/books/${id}`)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching book details:", err);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    setDeleting(true);
    try {
      await axios.delete(`${API_BASE_URL}/books/${id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      alert("Book deleted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (!book) return <h2>Book not found</h2>;

  return (
    <div style={styles.container}>
      {book.coverImage && (
        <img src={book.coverImage} alt={book.title} style={styles.coverImage} />
      )}
      <div style={styles.details}>
        <h2 style={styles.title}>{book.title}</h2>
        <p style={styles.text}><strong>Author:</strong> {book.author}</p>
        <p style={styles.text}><strong>Genre:</strong> {book.genre}</p>
        <p style={styles.text}><strong>Year:</strong> {book.year}</p>
        <p style={styles.description}><strong>Description:</strong> {book.description || "No description available."}</p>

        <Link to="/dashboard" style={styles.backButton}>🔙 Back to Dashboard</Link>

        {/* ✅ Show update & delete buttons only for admin */}
        {user?.role === "admin" && (
          <div style={styles.adminButtons}>
            <button 
            onClick={() => navigate(`/edit-book/${id}`)} 
              style={styles.updateButton}
            >
              ✏ Update Book
            </button>
            <button 
              onClick={handleDelete} 
              style={styles.deleteButton}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "🗑 Delete Book"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "400px", // ✅ Fixed width to 300px
    height: "79vh", // ✅ Set height to 70% of viewport
    margin: "auto",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
    backgroundColor: "#fff",
    textAlign: "center",
    transition: "all 0.3s ease",
    display: "flex", // ✅ Ensure content aligns well
    flexDirection: "column",
    justifyContent: "center",
  },
  coverImage: {
    width: "100%",
    maxWidth: "250px", // ✅ Adjusted for better fit
    height: "50%",
    borderRadius: "10px",
    marginBottom: "15px",
  },
  details: {
    padding: "10px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#007bff",
  },
  text: {
    fontSize: "18px",
    color: "#555",
  },
  description: {
    fontSize: "16px",
    color: "#666",
    marginTop: "10px",
  },
  backButton: {
    display: "inline-block",
    marginTop: "15px",
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  },
  adminButtons: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  updateButton: {
    padding: "10px 15px",
    backgroundColor: "#ffc107",
    color: "#222",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
  deleteButton: {
    padding: "10px 15px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  },
};

export default BookDetails;
