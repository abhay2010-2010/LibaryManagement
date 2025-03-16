import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { setBooks } from "../redux/reducers/Book";
import Book from "../components/Book";
// import { setBooks } from "../redux/slices/bookSlice";
// import Book from "../components/Book";

const Dashboard = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/books`)
      .then((res) => {
        dispatch(setBooks(res.data));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Books Libary</h2>
      <div className="row">
        {books.length > 0 ? (
          books.map((book) => <Book key={book._id} book={book} />)
        ) : (
          <p className="text-center">No books available</p>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
