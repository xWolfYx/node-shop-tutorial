import path from "node:path";
import express from "express";

import { renderNotfoundPage } from "./controllers/notfound.controller.js";
import { router as adminRouter } from "./routes/admin.route.js";
import { router as productRouter } from "./routes/products.route.js";
import shopRouter from "./routes/shop.route.js";
import "./models/product.js";
import { randomUUID } from "node:crypto";
import Cart from "./models/cart.js";
import CartItem from "./models/cart-item.js";
import Product from "./models/product.js";
import User from "./models/user.js";
import sequelize from "./utils/db.js";
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

try {
	User.hasMany(Product);
	Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

	User.hasOne(Cart, { constraints: true, onDelete: "CASCADE" });
	Cart.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

	Cart.belongsToMany(Product, { through: CartItem });
	Product.belongsToMany(Cart, { through: CartItem });
	sequelize.sync();


	app.listen(PORT, () =>
		console.log(`App is running on http://localhost:${PORT}`),
	);
} catch (err) {
	console.log(err);
}
