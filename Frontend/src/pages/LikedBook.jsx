import { useSelector } from "react-redux";
import { useState } from "react";
import { FaHeart, FaRegHeart, FaSearch } from "react-icons/fa";
import LikedBookCard from "../components/Likedbook";
import { Link } from "react-router-dom";
// import LikedBookCard from "../components/LikedBookCard"; // Import the custom card component

const LikedBooks = () => {
  const likedBooks = useSelector((state) => state.books.likedBooks || []); // ✅ Ensure an empty array
  const allBooks = useSelector((state) => state.books.books || []); // ✅ Ensure books is an array
  const [searchTerm, setSearchTerm] = useState("");

  console.log("Liked Book IDs:", likedBooks);
  
  // ✅ Ensure books is always an array before mapping
  if (!Array.isArray(allBooks)) {
    console.error("Error: allBooks is not an array", allBooks);
    return <p>Error loading books. Please try again.</p>;
  }

  // ✅ Filter books based on likedBooks
  const filteredBooks = allBooks.filter((book) => likedBooks.includes(book._id));
  
  // Apply search filtering if search term exists
  const searchFilteredBooks = searchTerm 
    ? filteredBooks.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.genre.toLowerCase().includes(searchTerm.toLowerCase()))
    : filteredBooks;
  
  console.log("filtered books", filteredBooks[0]);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header with heart icon */}
      <div className="mb-8 flex items-center justify-center flex-col">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 flex items-center">
          <FaHeart className="text-red-500 mr-2" /> My Favorite Books
        </h2>
        
       
      </div>

      {/* Book cards section */}
      {searchFilteredBooks.length > 0 ? (
        <div className="books-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchFilteredBooks.map((book) => (
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
                      {/* <button className={`like-button ${isLiked ? 'liked' : ''}`} onClick={() => dispatch(toggleLike(book._id))}>
                        {isLiked ? <FaHeart color="red" /> : <FaRegHeart />} Like
                      </button> */}
                      <Link to={`/book/${book._id}`} className="view-button">View Book</Link>
                    </div>
                  </div>
                </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="inline-block p-4 rounded-full bg-red-100 mb-4">
            <FaHeart className="text-red-400 text-4xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {searchTerm ? "No matching favorites found" : "No favorite books yet"}
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            {searchTerm 
              ? `We couldn't find any favorites matching "${searchTerm}".` 
              : "Start adding books to your favorites by clicking the heart icon on any book you love."}
          </p>
        
        </div>
      )}
    </div>
  );
};

export default LikedBooks;

// Example of how to use this in App.js or your router:
/*
import LikedBooks from './pages/LikedBooks';

// In your router or component tree
<Route path="/liked-books" element={<LikedBooks />} />
*/