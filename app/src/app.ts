import path from "node:path";
import express, {
	type NextFunction,
	type Request,
	type Response,
} from "express";
import { renderNotfoundPage } from "./controllers/notfound.controller.js";
import { router as adminRouter } from "./routes/admin.route.js";
import { router as productRouter } from "./routes/products.route.js";
import shopRouter from "./routes/shop.route.js";
import "./models/product.js";
import Cart from "./models/cart.js";
import CartItem from "./models/cart-item.js";
import Order from "./models/order.js";
import OrderItem from "./models/order-item.js";
import Product from "./models/product.js";
import User from "./models/user.js";
import sequelize from "./utils/db.js";
import { rootPath } from "./utils/path.js";

const PORT = 8000;
const DUMMY_USER_ID = "a6296334-b56d-465d-a7bf-6da234b9e0a7";

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(rootPath, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${rootPath}/public`));

app.use((req, res, next) => {
	res.locals.path = req.path;
	next();
});

app.use(async (req: Request, res: Response, next: NextFunction) => {
	try {
		(req as any).user = await User.findByPk(DUMMY_USER_ID);

		next();
	} catch (err) {
		next(err);
	}
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

	User.hasMany(Order, { constraints: true, onDelete: "CASCADE" });
	Order.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
	Order.belongsToMany(Product, { through: OrderItem });
	Product.belongsToMany(Order, { through: OrderItem });

	await sequelize.sync();

	let user = await User.findByPk(DUMMY_USER_ID);

	if (!user) {
		user = await User.create({
			id: DUMMY_USER_ID,
			name: "David",
			email: "david@email.com",
		});
	}

	const cart = await user.getCart();

	if (!cart) {
		await user.createCart();
	}

	app.listen(PORT, () =>
		console.log(`App is running on http://localhost:${PORT}`),
	);
} catch (err) {
	console.log(err);
}
