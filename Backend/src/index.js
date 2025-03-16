require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnect = require('./connection/DBconnect');
const AuthRoutes = require('./routes/auth');
const BookRoutes = require('./routes/book');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));  // Serve uploaded images


// Routes
app.use('/api/auth', AuthRoutes);
app.use('/api/books', BookRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async() =>{
    try {
      await  dbConnect
      console.log(`Server running on port ${PORT}`)
    } catch (error) {
        console.log(error)
    }
} );
