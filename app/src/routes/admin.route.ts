import express, { type Router } from "express";
import {
	addProduct,
	deleteProduct,
	editProduct,
	renderAddProducts,
	renderAdminProducts,
	renderEditProducts,
} from "../controllers/products.controller.js";

const router: Router = express.Router();

router.post("/add-product", addProduct);
router.get("/add-product", renderAddProducts);

router.get("/products", renderAdminProducts);

router.post("/edit-product", editProduct);
router.get("/edit-product/:id", renderEditProducts);

router.post("/delete-product", deleteProduct);

export { router };
