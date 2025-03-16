import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../redux/reducers/Book";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user); // Get user from Redux store
  const books = useSelector((state) => state.books.books); // ✅ Get current books list from Redux

  // Check if the user is an admin
  if (!user || user.role !== "admin") {
    return (
      <div style={styles.container}>
        <h2 style={styles.errorText}>❌ Access Denied</h2>
        <p style={styles.errorText}>Only Admins can add books.</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("genre", genre);
    formData.append("year", year);
    formData.append("description", description);
    formData.append("coverImage", coverImage);
  
    try {
      const res = await axios.post(`${API_BASE_URL}/books`, formData, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("API Response:", res.data); // ✅ Debugging: Log API response
  
      dispatch(setBooks([...books, res.data])); // ✅ Add new book to existing list

      alert("✅ Book added successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Error adding book:", error.response?.data || error);
      alert(`Failed to add book: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📚 Add New Book</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={styles.input} />
        <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required style={styles.input} />
        <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} required style={styles.input} />
        <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} required style={styles.input} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={styles.textarea}></textarea>
        <input type="file" onChange={(e) => setCoverImage(e.target.files[0])} required style={styles.input} />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    maxWidth: "500px",
    margin: "auto",
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#007bff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    margin: "5px 0",
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  textarea: {
    padding: "10px",
    margin: "5px 0",
    width: "100%",
    border: "1px solid #ddd",
    borderRadius: "5px",
    height: "80px",
  },
  button: {
    padding: "12px",
    marginTop: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  errorText: {
    color: "red",
    fontSize: "20px",
    fontWeight: "bold",
  },
};

export default AddBook;
