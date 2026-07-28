import express, { type Router } from "express";

import {
	addToCart,
	removeFromCart,
	renderCart,
} from "../controllers/cart.controller.js";

const router: Router = express.Router();

router.get("/cart", renderCart);
router.post("/cart", addToCart);
router.post("/cart/cart-delete-item", removeFromCart);

export default router;
