import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/book.css";

const Book = ({ book, loading }) => {
  const [liked, setLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation();
    setLiked(!liked);
  };

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
            <img src={book.coverImage} alt={book.title} className="book-image" onLoad={() => setImageLoaded(true)} />
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
            <button className={`like-button ${liked ? 'liked' : ''}`} onClick={handleLike}>
              {liked ? <FaHeart color="red" /> : <FaRegHeart />} Like
            </button>
            <Link to={`/book/${book._id}`} className="view-button">View Book</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookList = ({ books, loading }) => {
  return (
    <div className="books-grid">
      {books.map((book, index) => (
        <Book key={index} book={book} loading={loading} />
      ))}
    </div>
  );
};

export default BookList;