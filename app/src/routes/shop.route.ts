import express from "express";

const router = express.Router();

import { renderProducts } from "../controllers/products.controller";
import { renderCart } from "../controllers/shop.controller";

router.get("/", renderProducts);
router.get("/cart", renderCart);

export default router;
