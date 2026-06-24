import express, { type Router } from "express";
import {
	addProduct,
	renderProduct,
	renderProducts,
} from "../controllers/products.controller.js";

const router: Router = express.Router();

router.get("/products", renderProducts);
router.get("/products/:id", renderProduct);
router.post("/add-product", addProduct);

export { router };
