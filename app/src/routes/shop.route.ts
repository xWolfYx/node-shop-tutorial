import express from "express";

const router = express.Router();

import { products } from "./product.route";

router.get("/", (_, res) => {
	console.log(products);
	res.render("shop", {
		products,
		pageTitle: "Shop",
	});
});

export default router;
