import express from "express";

const router = express.Router();

import {
	renderCart,
	renderCheckout,
	renderIndex,
	renderOrders,
} from "../controllers/shop.controller";

router.get("/", renderIndex);
router.get("/cart", renderCart);
router.get("/orders", renderOrders);
router.get("/checkout", renderCheckout);

export default router;
