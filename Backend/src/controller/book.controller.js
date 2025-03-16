const BookModal = require("../schema/book");
const cloudnary=require("../config/cloudnary")

const getBooks=async (req, res) => {
    const books = await BookModal.find();
    res.json(books);
};

const getBookById=async (req, res) => {
    const book = await BookModal.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
};

const postBook=async (req, res) => {
    const { title, author, genre, year, description } = req.body;
    const coverImage = req.file ? req.file.path : ''; // Cloudinary URL

    const book = new BookModal({ title, author, genre, year, description, coverImage });
    await book.save();
    res.json(book);
};

const deleteBook=async (req, res) => {
    const book = await BookModal.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // Remove book cover from Cloudinary
    if (book.coverImage) {
        const publicId = book.coverImage.split('/').pop().split('.')[0];
        await cloudnary.uploader.destroy(`library_books/${publicId}`);
    }

    await BookModal.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
};

const updateBook=async (req, res) => {
    try {
        const { title, author, genre, year, description } = req.body;
        let book = await BookModal.findById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });

        // If a new cover image is uploaded, delete the old one from Cloudinary
        let coverImage = book.coverImage;
        if (req.file) {
            if (coverImage) {
                const publicId = coverImage.split('/').pop().split('.')[0]; // Extract Cloudinary public ID
                await cloudinary.uploader.destroy(`library_books/${publicId}`);
            }
            coverImage = req.file.path; // New Cloudinary image URL
        }

        // Update book details
        book = await BookModal.findByIdAndUpdate(
            req.params.id,
            { title, author, genre, year, description, coverImage },
            { new: true }
        );

        res.json({ message: "Book updated successfully", book });
    } catch (error) {
        res.status(500).json({ message: "Error updating book", error });
    }
}



module.exports = {
    getBooks,
    getBookById,
    postBook,
    deleteBook,
    updateBook,
};

 
