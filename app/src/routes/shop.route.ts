import express, { type Router } from "express";

const router: Router = express.Router();

import {
	postCart,
	renderCart,
	renderCheckout,
	renderIndex,
	renderOrders,
} from "../controllers/shop.controller.js";

router.get("/", renderIndex);

router.get("/cart", renderCart);
router.post("/cart", postCart);

router.get("/orders", renderOrders);
router.get("/checkout", renderCheckout);

export default router;
