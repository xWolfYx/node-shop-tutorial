import express from "express";

const router = express.Router();

import { renderProducts } from "../controllers/products.controller";

router.get("/", renderProducts);

export default router;
