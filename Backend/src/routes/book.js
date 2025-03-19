const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const Cloudinary=require("../config/cloudnary")
const { getBooks, getBookById, postBook, updateBook, deleteBook } = require('../controller/book.controller');
const authMiddleware = require('../middleware/auth.middleware');
const roleMiddleware = require('../middleware/acces.middleware');


const BookRoutes = express.Router();

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: Cloudinary,
    params: {
        folder: "library_books",
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

const upload = multer({ storage });

// 🔹 Get all books (Public)
BookRoutes.get('/',authMiddleware, getBooks);

// 🔹 Get a single book by ID (Public)
BookRoutes.get('/:id',authMiddleware, getBookById);

// 🔹 Add a new book (Admin Only)
BookRoutes.post('/', authMiddleware, roleMiddleware('admin'), upload.single('coverImage'), postBook);

// �� Update a book (Admin Only)
// Update a book (Admin Only)
BookRoutes.put('/:id', authMiddleware, roleMiddleware('admin'), upload.single('coverImage'),updateBook );


// 🔹 Delete a book (Admin Only)
BookRoutes.delete('/:id', authMiddleware, roleMiddleware('admin'),deleteBook );

module.exports = BookRoutes;
