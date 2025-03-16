const express = require('express');

const { register, login } = require('../controller/user.controller');

const AuthRoutes = express.Router();

// User Registration
AuthRoutes.post('/register',register );

// User Login
AuthRoutes.post('/login', login);

module.exports = AuthRoutes;
