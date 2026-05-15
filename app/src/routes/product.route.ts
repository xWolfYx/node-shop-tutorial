import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

const router = express.Router();

router.get("/add-product", (_, res) => {
	res.sendFile(path.join(__dirname, "../", "views", "add-product.html"));
});

router.post("/add-product", (req, res) => {
	console.log(req.body);
	res.redirect("/");
});

export default router;
