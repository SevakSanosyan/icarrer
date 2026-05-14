const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const listingRoutes = require("./routes/ListingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB connect (fixed + safer logging)
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error(" MONGO_URI is not defined in environment variables");
}

mongoose
  .connect(mongoURI)
  .then(() => console.log(" MongoDB Connected"))
  .catch((err) => console.log(" MongoDB connection error:", err));

// routes
app.use("/api/listings", listingRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// IMPORTANT: Render uses dynamic port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});