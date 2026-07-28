import express, { type Router } from "express";

const router: Router = express.Router();

import { renderCheckout, renderIndex } from "../controllers/shop.controller.js";

router.get("/", renderIndex);

router.get("/checkout", renderCheckout);

export default router;
