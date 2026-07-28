import express, { type Router } from "express";
import { renderOrders, submitOrder } from "../controllers/order.controller.js";

const router: Router = express.Router();

router.post("/create-order", submitOrder);
router.get("/orders", renderOrders);

export default router;
