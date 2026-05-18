import path from "node:path";
import express from "express";
import { rootPath } from "../utils/path";

const router = express.Router();

import { products } from "./product.route";

router.get("/", (_, res) => {
	console.log(products);
	res.sendFile(path.join(rootPath, "views", "shop.html"));
});

export default router;
