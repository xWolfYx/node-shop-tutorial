import express, { type Router } from "express";
import {
	addProduct,
	renderAddProducts,
	renderAdminProducts,
} from "../controllers/products.controller.js";

const router: Router = express.Router();

router.get("/add-product", renderAddProducts);
router.get("/products", renderAdminProducts);

router.post("/add-product", addProduct);

export { router };
