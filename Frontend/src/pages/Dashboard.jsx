import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { setBooks } from "../redux/reducers/Book";
import BooksGrid from "../components/BookGrid";
import BookList from "../components/Book";
// import { BookGrid } from "../components/Book"; // ✅ Correct import

const Dashboard = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/books`)
      .then((res) => {
        console.log("API Response:", res.data);
        dispatch(setBooks(res.data || [])); // ✅ Ensure it's an array
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setLoading(false);
      });
  }, [dispatch]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📚 Books Library</h2>
      <BookList books={books} loading={loading} /> {/* ✅ Correct Usage */}
    </div>
  );
};

export default Dashboard;
