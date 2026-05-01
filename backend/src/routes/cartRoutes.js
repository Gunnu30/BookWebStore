const express = require('express');
const routes = express.Router();

const cartController = require('../controllers/cartController')
const authMiddleware = require("../middleware/authMiddleware")

routes.get("/cart", authMiddleware, cartController.cartItems)
routes.post('/confirm-payment',authMiddleware,cartController.confirmPayment)
routes.post('/add-to-cart', authMiddleware,cartController.cart)


module.exports = routes;