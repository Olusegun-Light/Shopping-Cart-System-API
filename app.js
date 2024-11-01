const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const productRoutes = require("./routes/productRoute");
const cartRoutes = require("./routes/cartRoutes");
const userRoutes = require("./routes/userRoutes");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");

require("./utils/catchHelper");

const app = express();
app.use(express.json());

app.use(bodyParser.json());
app.use(morgan("dev"));

app.use(cors());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Welcome To Shopping Cart API!");
});
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/user", userRoutes);

// Handling unhandled routes
// For all http methods
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Error handling middleware
app.use(globalErrorHandler);

module.exports = app;
