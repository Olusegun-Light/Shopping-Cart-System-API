const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");
const cleanCache = require("../middlewares/cleanCache");

router.use(authController.protect);

router
  .route("/:productId")
  .get(productController.getProduct)
  .post(productController.updateStock, cleanCache);

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct, cleanCache);

module.exports = router;
