const Product = require("../models/productModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getProduct = catchAsync(async (req, res, next) => {
  const { productId } = req.params;
  const product = await Product.findById(productId).cache({ key: req.user.id });

  if (!product) return next(new AppError("Product not found", 404));

  res.status(200).json({
    status: "success",
    data: { product },
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find().cache({ key: "all_products" });

  res.status(200).json({
    status: "success",
    data: { products },
  });
});

exports.updateStock = catchAsync(async (req, res, next) => {
  const { quantity } = req.body;
  const { productId } = req.params;

  // Ensure quantity is provided
  if (!quantity || quantity <= 0) {
    return next(new AppError("Quantity must be greater than 0", 400));
  }

  const product = await Product.findById(productId);
  if (!product) return next(new AppError("Product not found", 404));

  // Check stock level
  if (product.stock < quantity) {
    return next(new AppError("Insufficient stock", 400));
  }

  // Update stock and save
  product.stock -= quantity;
  await product.save();

  res.status(200).json({
    status: "success",
    data: { product },
  });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const { name, description, price, stock } = req.body;

  // Validate required fields
  if (!name || !price || !stock) {
    return next(new AppError("Name, price, and stock are required", 400));
  }

  // Create and save the product
  const newProduct = await Product.create({ name, description, price, stock });

  res.status(201).json({
    status: "success",
    message: "Product created successfully",
    data: { product: newProduct },
  });
});
