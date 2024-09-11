const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const homeRoute = require('./routes/homeRoute');
const methodOverride = require("method-override");
require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.use(express.static("public"));


app.use('/', homeRoute); 
app.use("/books", bookRoutes);
app.use("/auth", authRoutes);

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
