import { FaHeart, FaTrash, FaBookOpen } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toggleLike } from "../redux/reducers/Book"; // Assuming this is your like action
import { Link } from "react-router-dom";

const LikedBookCard = ({ book }) => {
  const dispatch = useDispatch();

  if (!book) return null;

  const handleRemoveFromLiked = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleLike(book._id));
  };

  return (
    <div className="flex flex-col h-full overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-lg">
      {/* Card Header with Image */}
      <div className="relative h-48 overflow-hidden">
        {book.coverImage ? (
          <img 
            src={book.coverImage} 
            alt={book.title} 
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" 
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200">
            <FaBookOpen size={40} className="text-gray-400" />
          </div>
        )}
        
        {/* Favorite indicator */}
        <div className="absolute left-0 top-0 bg-red-500 px-3 py-1 text-white">
          <FaHeart className="inline-block mr-1" size={14} />
          <span className="text-xs font-medium">Favorite</span>
        </div>
        
        {/* Remove button */}
        <button 
          onClick={handleRemoveFromLiked}
          className="absolute right-2 top-2 rounded-full bg-white p-2 shadow-md transition-all duration-300 hover:bg-red-50"
          aria-label="Remove from favorites"
        >
          <FaTrash className="text-red-500" size={14} />
        </button>
      </div>
      
      {/* Card Content */}
      <Link to={`/book/${book._id}`} className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 text-lg font-bold text-gray-800 line-clamp-1">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{book.author}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
            {book.genre}
          </span>
          <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-800">
            {book.year}
          </span>
        </div>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2 flex-grow">
          {book.description}
        </p>
        
        <div className="mt-auto pt-2 text-right">
          <Link 
            to={`/book/${book._id}`}
            className="inline-flex items-center rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-200"
          >
            View Details
            <svg className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default LikedBookCard;