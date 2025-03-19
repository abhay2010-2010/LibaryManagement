import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { setBooks } from "../redux/reducers/Book";
import BookList from "../components/Book";

const Dashboard = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books || []);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    axios.get(`${API_BASE_URL}/books`)
      .then((res) => {
        dispatch(setBooks(res.data || []));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setLoading(false);
      });
  }, [dispatch]);

  // ✅ Filter Books by Search Term
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Sort Books by Year
  const sortedBooks = [...filteredBooks].sort((a, b) =>
    sortOrder === "asc" ? a.year - b.year : b.year - a.year
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📚 Books Library</h2>

      {/* 🔍 Search & Sorting Bar */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* Search Bar */}
        <input
          type="text"
          className="form-control w-50"
          placeholder="🔍 Search books by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Sorting Dropdown */}
        <select
          className="form-select w-25"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">⬆ Sort by Year (Ascending)</option>
          <option value="desc">⬇ Sort by Year (Descending)</option>
        </select>
      </div>

      {/* Render Books */}
      <BookList books={sortedBooks} loading={loading} />
    </div>
  );
};

export default Dashboard;
