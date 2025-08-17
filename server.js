const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const sopRoute = require("./routes/sop"); // Import SOP router

// MongoDB Atlas connection URI (no port for +srv)

MONGO_URI =
  "mongodb+srv://nizam:20h65a1216@cluster0.bzysdzf.mongodb.net/relaySOPs?retryWrites=true&w=majority";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// SOP routes
app.use("/api/sop", sopRoute);

// Connect to MongoDB Atlas
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
