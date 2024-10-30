const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.addToCart = catchAsync(async (req, res, next) => {
  const { quantity } = req.body;
  const { productId } = req.params;

  // Validate input
  if (!quantity || quantity <= 0) {
    return next(new AppError("A valid quantity is required", 400));
  }

  // Check if product exists
  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError("Product not found", 404));
  }

  // Find or create cart for the user
  let cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) cart = new Cart({ userId: req.user.id, items: [] });

  // Find existing item in the cart
  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  // Update quantity or add new item
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  // Save the updated cart
  await cart.save();
  res.status(201).json({ status: "success", data: cart });
});

exports.checkout = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate(
    "items.productId"
  );

  if (!cart || cart.items.length === 0) {
    return next(new AppError("Cart is empty", 400));
  }

  for (const item of cart.items) {
    const product = await Product.findById(item.productId._id);

    if (!product || product.stock < item.quantity) {
      return next(new AppError(`Insufficient stock for ${product?.name}`, 400));
    }

    // Deduct stock for each item
    product.stock -= item.quantity;
    await product.save();
  }

  // Clear the cart after successful checkout
  cart.items = [];
  await cart.save();

  res.status(200).json({ message: "Checkout successful" });
});

// Function to retrieve the user's cart
exports.getCart = catchAsync(async (req, res, next) => {
  // Find the cart for the user
  const cart = await Cart.findOne({ userId: req.user.id }).populate(
    "items.productId"
  );

  // Check if the cart exists
  if (!cart) {
    return next(new AppError("Cart not found", 404));
  }

  // Return the cart details
  res.status(200).json({
    status: "success",
    data: {
      cart,
    },
  });
});
