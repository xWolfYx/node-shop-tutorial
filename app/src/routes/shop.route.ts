import path from "node:path";
import express from "express";
import { rootPath } from "../utils/path";

const router = express.Router();

router.get("/", (_, res) => {
	res.sendFile(path.join(rootPath, "views", "shop.html"));
});

export default router;
