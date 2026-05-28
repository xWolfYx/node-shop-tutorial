import path from "node:path";
import express from "express";

import { renderNotfoundPage } from "./controllers/notfound.controller";
import { router as adminRouter } from "./routes/admin.route";
import shopRouter from "./routes/shop.route";
import { rootPath } from "./utils/path";

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

app.use(renderNotfoundPage);

app.listen(PORT, () => {
	console.log(`App is running on http://localhost:${PORT}`);
});
