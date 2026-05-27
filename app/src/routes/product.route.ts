import express from "express";
import {
	addProduct,
	renderAddProducts,
} from "../controllers/products.controller";

const router = express.Router();

router.get("/add-product", renderAddProducts);

router.post("/add-product", addProduct);

export { router };
