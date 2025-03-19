import { useSelector } from "react-redux";
import Book from "../components/Book"; // ✅ Import the Book component

const LikedBooks = () => {
  const likedBooks = useSelector((state) => state.books.likedBooks || []); // ✅ Ensure an empty array
  const allBooks = useSelector((state) => state.books.books || []); // ✅ Ensure books is an array

  console.log("Liked Book IDs:", likedBooks);
  console.log("All Books:", allBooks);

  // ✅ Ensure books is always an array before mapping
  if (!Array.isArray(allBooks)) {
    console.error("Error: allBooks is not an array", allBooks);
    return <p>Error loading books. Please try again.</p>;
  }

  // ✅ Filter books based on likedBooks
  const filteredBooks = allBooks.filter((book) => likedBooks.includes(book._id));
  console.log("filtered books", filteredBooks[0]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">❤️ Liked Books</h2>

      {filteredBooks.length > 0 ? (
        <div className="books-grid">
          {filteredBooks.map((book) => (
           <div></div>
          ))}
        </div>
      ) : (
        <p className="text-center">No liked books found.</p>
      )}
    </div>
  );
};

export default LikedBooks;
