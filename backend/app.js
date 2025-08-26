const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const connectDB = require("./db/db");
const authRoutes = require("./routes/auth");
const mapRoutes = require("./routes/map");

const app = express();

// Connect to MongoDB
connectDB(); 

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/map", mapRoutes);


module.exports = app;
