import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike } from "../redux/reducers/Book"; // ✅ Import Redux action
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/book.css";

const Book = ({ book, loading }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const likedBooks = useSelector((state) => state.books.likedBooks);
  const isLiked = likedBooks.includes(book._id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (book?.coverImage) {
      const img = new Image();
      img.src = book.coverImage;
      img.onload = () => setImageLoaded(true);
    }
  }, [book]);

  if (loading || !imageLoaded) {
    return (
      <div className="book-container">
        <div className="book-skeleton">
          <div className="skeleton-image"></div>
          <div className="skeleton-content">
            <div className="skeleton-title"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-buttons">
              <div className="skeleton-btn"></div>
              <div className="skeleton-btn"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="book-container">
      <div className="book-card" onClick={() => window.location.href = `/book/${book._id}`}>
        <div className="book-image-container">
          {book.coverImage ? (
            <img src={book.coverImage} alt={book.title} className="book-image" />
          ) : (
            <div className="skeleton-image"></div>
          )}
        </div>
        <div className="book-content">
          <h5 className="book-title">Title: {book.title}</h5>
          <div className="book-details">
            <p className="book-author">Author: {book.author}</p> 
            <p className="book-genre">Genre: {book.genre}</p> 
            <p className="book-year">Year: {book.year}</p>
          </div>
          <div className="book-actions">
            <button className={`like-button ${isLiked ? 'liked' : ''}`} onClick={() => dispatch(toggleLike(book._id))}>
              {isLiked ? <FaHeart color="red" /> : <FaRegHeart />} Like
            </button>
            <Link to={`/book/${book._id}`} className="view-button">View Book</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookList = ({ books = [], loading }) => {
  if (!Array.isArray(books)) {
    console.error("Error: books is not an array", books);
    return <p className="text-center text-danger">Error loading books. Please try again.</p>;
  }

  if (loading) {
    return <p className="text-center">Loading books...</p>;
  }

  return (
    <div className="books-grid">
      {books.length > 0 ? (
        books.map((book) => <Book key={book._id} book={book} />)
      ) : (
        <p className="text-center">No books available.</p>
      )}
    </div>
  );
};

export default BookList;

