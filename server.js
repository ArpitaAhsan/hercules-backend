const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Import database connection
const connectDB = require("./config/db");

dotenv.config();  // Load environment variables

const app = express();

// Middleware
app.use(express.json()); // Allows JSON parsing
app.use(cors({
  origin: [
    "https://hercules-orcin.vercel.app", // Your frontend URL
    "http://localhost:3000" // For local testing
  ],
  credentials: true
}));

// Import Routes
const authRoutes = require("./routes/auth");

app.get('/', (req, res) => {  // Added root route
  res.json({ 
    status: "running",
    docs: "https://github.com/ArpitaAhsan/Hercules" 
  });
});

// Add this above other routes
app.get('/api', (req, res) => {
  res.json({
    available_endpoints: [
      "POST /api/auth/register",
      "POST /api/auth/login",
      "GET /api/profile/:userId"
    ]
  });
});
// Use Routes
app.use("/api/auth", authRoutes);

// Connect to MongoDB
connectDB();  // Establish MongoDB connection

const PORT = process.env.PORT || 9062;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));  // Fix string interpolation
 
 
