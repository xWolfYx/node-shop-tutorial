import express from "express";
import {
	addProduct,
	renderProduct,
	renderProducts,
} from "../controllers/products.controller";

const router = express.Router();

router.get("/products", renderProducts);
router.get("/products/:id", renderProduct);
router.post("/add-product", addProduct);

export { router };
