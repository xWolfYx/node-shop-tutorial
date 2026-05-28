import express from "express";
import {
	addProduct,
	renderAddProducts,
	renderAdminProducts,
} from "../controllers/products.controller";

const router = express.Router();

router.get("/add-product", renderAddProducts);
router.get("/products", renderAdminProducts);

router.post("/add-product", addProduct);

export { router };
