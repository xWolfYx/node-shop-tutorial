import path from "node:path";
import express from "express";

import { router as productRouter } from "./routes/product.route";
import shopRouter from "./routes/shop.route";
import { rootPath } from "./utils/path";

const PORT = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(rootPath, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${rootPath}/public`));

app.use("/admin", productRouter);

app.use(shopRouter);

app.use((_, res) => {
	res.status(404).render("not-found", {
		pageTitle: "404 - Page Not Found",
		bodyClass: "page page--error",
	});
});

app.listen(PORT, () => {
	console.log(`App is running on http://localhost:${PORT}`);
});
