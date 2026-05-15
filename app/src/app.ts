import path from "node:path";
import { fileURLToPath } from "node:url";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

import express from "express";

import productRouter from "./routes/product.route";
import shopRouter from "./routes/shop.route";

const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use("/admin", productRouter);

app.use(shopRouter);

app.use((_, res) => {
	res.status(404).sendFile(path.join(__dirname, "views", "not-found.html"));
});

app.listen(PORT, () => {
	console.log(`App is running on http://localhost:${PORT}`);
});
