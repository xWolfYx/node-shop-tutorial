import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

const router = express.Router();

router.get("/", (_, res) => {
	res.sendFile(path.join(__dirname, "../", "views", "shop.html"));
});

export default router;
