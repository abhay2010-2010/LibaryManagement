const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String },
    coverImage: { type: String }  // Store image filename
});
 
const BookModal= mongoose.model('BookLib', BookSchema);

module.exports = BookModal;
