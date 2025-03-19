import { useEffect, useState } from "react";
import Book from "./Book";


const BooksGrid = ({ books  }) => {  
  const [delayedBooks, setDelayedBooks] = useState([]); // ✅ Ensure it's always an array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Array.isArray(books)) {  // ✅ Ensure books is an array before setting state
      setTimeout(() => {
        setDelayedBooks(books);
        setLoading(false);
      }, 3000); // ⏳ Simulate API delay
    } else {
      console.error("Books data is not an array:", books);
      setDelayedBooks([]); // ✅ Fallback to empty array
      setLoading(false);
    }
  }, [books]);

  return (
    <div className="books-grid">
      {loading ? (
        [...Array(6)].map((_, index) => <Book key={index} loading={true} />)
      ) : delayedBooks.length > 0 ? (
        delayedBooks.map((book) => <Book key={book._id} book={book} loading={false} />)
      ) : (
        <div class="d-flex justify-content-center mt-2">
  <div class="spinner-border" role="status">
    <span class="sr-only">Books...</span>
  </div>
</div>
      )}
    </div>
  );
};
export default BooksGrid;