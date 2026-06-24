import path from "node:path";
import express from "express";

import { renderNotfoundPage } from "./controllers/notfound.controller.js";
import { router as adminRouter } from "./routes/admin.route.js";
import { router as productRouter } from "./routes/products.route.js";
import shopRouter from "./routes/shop.route.js";
import { rootPath } from "./utils/path.js";

const PORT = 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(rootPath, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${rootPath}/public`));

app.use((req, res, next) => {
	res.locals.path = req.path;
	next();
});

app.use("/admin", adminRouter);

app.use(shopRouter);
app.use(productRouter);

app.use(renderNotfoundPage);

app.listen(PORT, () => {
	console.log(`App is running on http://localhost:${PORT}`);
});
