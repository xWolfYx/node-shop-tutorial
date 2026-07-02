import express, { type Router } from "express";

const router: Router = express.Router();

import {
	addToCart,
	removeFromCart,
	renderCart,
	renderCheckout,
	renderIndex,
	renderOrders,
} from "../controllers/shop.controller.js";

router.get("/", renderIndex);

router.get("/cart", renderCart);
router.post("/cart", addToCart);
router.post("/cart/cart-delete-item", removeFromCart);

router.get("/orders", renderOrders);
router.get("/checkout", renderCheckout);

export default router;
