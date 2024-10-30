const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authController = require("../controllers/authController");
const cleanCache = require("../middlewares/cleanCache");

router.use(authController.protect);

router.get("/", cartController.getCart);
router.post("/add/:productId", cartController.addToCart);
router.post("/checkout", cartController.checkout, cleanCache);

module.exports = router;
