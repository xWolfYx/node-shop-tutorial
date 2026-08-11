import path from "node:path";
import express from "express";
import { renderNotfoundPage } from "./controllers/notfound.controller.js";
import adminRouter from "./routes/admin.route.js";
import orderRouter from "./routes/order.route.js";
import productRouter from "./routes/products.route.js";
import shopRouter from "./routes/shop.route.js";
import "./models/product.js";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.js";
import { rootPath } from "./utils/path.js";

dotenv.config();

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(rootPath, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${rootPath}/public`));

app.use((req: Request, res: Response, next: NextFunction) => {
	res.locals.path = req.path;
	next();
});

app.use("/admin", adminRouter);
app.use(cartRouter);
app.use(orderRouter);
app.use(productRouter);
app.use(shopRouter);

app.use(renderNotfoundPage);

const { PORT } = process.env;

const startServer = async () => {
	try {
		await connectDB();

		app.listen(PORT, () =>
			console.log(`App is running on http://localhost:${PORT}`),
		);
	} catch (err) {
		console.log("Error starting the server", err);
		process.exit(1);
	}
};

startServer();
