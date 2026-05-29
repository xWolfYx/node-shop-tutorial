import express from "express";
import { addProduct, renderProducts } from "../controllers/products.controller";

const router = express.Router();

router.get("/products", renderProducts);
router.post("/add-product", addProduct);

export { router };
