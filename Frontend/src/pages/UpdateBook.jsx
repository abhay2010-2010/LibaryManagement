import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UpdateBook = () => {
  const { id } = useParams(); // Get book ID from URL
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // Get logged-in user
  
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Redirect non-admin users
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // ✅ Fetch book details
  useEffect(() => {
    axios.get(`${API_BASE_URL}/books/${id}`)
      .then((res) => {
        const book = res.data;
        setTitle(book.title);
        setAuthor(book.author);
        setGenre(book.genre);
        setYear(book.year);
        setDescription(book.description);
      })
      .catch((err) => {
        console.error("Error fetching book:", err);
        alert("Failed to fetch book details.");
      });
  }, [id]);

  // ✅ Handle form submission
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("genre", genre);
    formData.append("year", year);
    formData.append("description", description);
    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    try {
      await axios.put(`${API_BASE_URL}/books/${id}`, formData, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("✅ Book updated succesfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("❌ Error updating book:", error);
      toast.error("❌ fail to update book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>✏ Update Book</h2>
      <form onSubmit={handleUpdate} style={styles.form}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={styles.input} />
        <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required style={styles.input} />
        <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} required style={styles.input} />
        <input type="number" placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} required style={styles.input} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={styles.textarea}></textarea>
        <input type="file" onChange={(e) => setCoverImage(e.target.files[0])} style={styles.input} />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Updating..." : "Update Book"}
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
};

export default UpdateBook;
