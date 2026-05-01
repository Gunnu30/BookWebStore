require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middleware/authMiddleware")

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // frontend dev server
  credentials: true
}));

app.get("/auth", authMiddleware, (req, res) => {
   res.json({ message: "Token valid", user: req.user.username }); 
});
// Routes (auth will be added later)
app.use(require("./routes/authRoutes"));
app.use(require("./routes/booksRoutes"));
app.use(require("./routes/cartRoutes"))



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
