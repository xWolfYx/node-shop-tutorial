import express from "express";

const router = express.Router();

import {
	renderCart,
	renderCheckout,
	renderIndex,
} from "../controllers/shop.controller";

router.get("/", renderIndex);
router.get("/cart", renderCart);
router.get("/checkout", renderCheckout);

export default router;
