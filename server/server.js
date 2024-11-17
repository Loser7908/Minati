require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");

const commonFeatureRouter = require("./routes/common/feature-routes");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration
app.use(
  cors({
    origin: [process.env.CORS_ORIGIN, "http://localhost:5173","https://minati-zeta.vercel.app/"], // Allowed origins (adjust for your environment)
    methods: ["GET", "POST", "DELETE", "PUT"], // Allowed methods
    allowedHeaders: ["Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",], // Allowed headers
    credentials: true, // Enable cookies or authorization headers
  })
);

// Log the incoming request origin for debugging
app.use((req, res, next) => {
  console.log(`Incoming request from origin: ${req.headers.origin}`);
  next();
});

// Handle preflight requests
app.options("*", cors());

// Middleware
app.use(cookieParser()); // Middleware to parse cookies
app.use(express.json()); // Middleware to parse JSON bodies

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/common/feature", commonFeatureRouter);

// Start the server
app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
