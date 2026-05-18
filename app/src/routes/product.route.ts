import path from "node:path";
import express from "express";
import { rootPath } from "../utils/path";

const router = express.Router();

const products: { title: string }[] = [];

router.get("/add-product", (_, res) => {
	res.sendFile(path.join(rootPath, "views", "add-product.html"));
});

router.post("/add-product", (req, res) => {
	console.log(req.body);
	products.push({ title: req.body.title });
	res.redirect("/");
});

export { products, router };
