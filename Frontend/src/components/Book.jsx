import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Icons for like button
import "bootstrap/dist/css/bootstrap.min.css";
const Book = ({ book }) => {
  const [liked, setLiked] = useState(false);
// console.log(book) for checking i am getting data tor not
  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4">
      <div className="card shadow-lg border-0 rounded overflow-hidden">
        {book.coverImage && (
          <img
            src={book.coverImage}
            className="card-img-top"
            alt={book.title}
            style={{ height: "50%", objectFit: "cover" }}
          />
        )}
        <div className="card-body text-center d-flex flex-column">
          <h5 className="card-title fw-bold text-primary">{book.title}</h5>
          <p className="card-text text-secondary">
            <strong>Author:</strong> {book.author} <br />
            <strong>Genre:</strong> {book.genre} <br />
            <strong>Year:</strong> {book.year}
          </p>
          <div className="mt-auto">
            <button className="btn btn-outline-danger me-2" onClick={handleLike}>
              {liked ? <FaHeart color="red" /> : <FaRegHeart />} Like
            </button>
            <Link to={`/book/${book._id}`} className="btn btn-primary">
              View Book
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
