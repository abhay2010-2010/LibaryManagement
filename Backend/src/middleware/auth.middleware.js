const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");

    console.log("🔍 Checking Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("🚫 Unauthorized: No token provided");
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer"
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Token Verified! User Role:", decoded.role);
        req.user = decoded; // Store user details in request
        next();
    } catch (error) {
        console.log("❌ Invalid or Expired Token");
        res.status(403).json({ message: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;
