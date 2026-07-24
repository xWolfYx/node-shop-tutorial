import express, { type Router } from "express";
import { submitOrder } from "../controllers/shop.controller.js";

const router: Router = express.Router();

router.post("/submit-order", submitOrder);

export default router;
