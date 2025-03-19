import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  // console.log(book)

  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookDetails = async () => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.log("⚠ No token found. Redirecting to login...");
        toast.error("❌ Unauthorized! Please log in.");
        navigate("/login");
        return;
      }
  
      try {
        const res = await axios.get(`${API_BASE_URL}/books/${id}`, {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Send token
        });
  
        setBook(res.data);
        setLoading(false);
      } catch (error) {
        console.error("❌ Error fetching book details:", error);
        toast.error("❌ Failed to load book details!");
        setLoading(false);
      }
    };
  
    fetchBookDetails();
  }, [id, navigate]);
  

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    setDeleting(true);
    try {
      await axios.delete(`${API_BASE_URL}/books/${id}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      toast.success("✅ Book deleted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("❌ Failed to delete book.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <h2 className="loading">Loading...</h2>;
  if (!book) return <h2 className="not-found">Book not found</h2>;

  return (
    <div style={styles.container}>
      <div style={styles.bookCard}>
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
    </div>
  );
};

// 🎨 **Styled Components**
const styles = {
  container: {
    width: "100%",
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f4f4f4",
  },
  bookCard: {
    width: "90%",
    maxWidth: "600px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    transition: "all 0.3s ease-in-out",
  },
  coverImage: {
    width: "100%",
    maxWidth: "300px",
    height: "250px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "15px",
  },
  details: {
    width: "100%",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: "10px",
  },
  text: {
    fontSize: "18px",
    color: "#555",
    margin: "5px 0",
  },
  description: {
    fontSize: "16px",
    color: "#666",
    marginTop: "10px",
    padding: "10px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
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
    fontWeight: "bold",
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
    fontWeight: "bold",
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
    fontWeight: "bold",
  },
};

export default BookDetails;
