import type { Request, Response } from "express";
import { Sequelize } from "sequelize";
import type { ProductData } from "../lib/types.js";
import { toUSD } from "../lib/utils.js";
import Product from "../models/product.js";

export const renderIndex = async (_: Request, res: Response) => {
	try {
		const rawProducts = await Product.findAll();
		const products = rawProducts.map((p) => ({
			...p.toJSON(),
			price: toUSD(p.price),
		}));

		res.render("shop/index", {
			products: products.length ? products : [],
			pageTitle: "Shop",
		});
	} catch (err) {
		console.log(err);
	}
};

export const renderCart = async (req: Request, res: Response) => {
	try {
		const cart = await req.user.getCart();
		const rawProducts = await cart.getProducts();

		const totalResult = await cart.getProducts({
			attributes: [
				[
					Sequelize.fn(
						"SUM",
						Sequelize.literal("`product`.`price` * `cartItem`.`quantity`"),
					),
					"totalPrice",
				],
			],
			joinTableAttributes: [],
			raw: true,
		});

		const rawTotal = Number(totalResult[0]?.totalPrice) || 0;

		const products: ProductData[] = rawProducts.map((p) => ({
			...p.toJSON(),
			price: toUSD(p.price),
		}));

		res.render("shop/cart", {
			pageTitle: "Cart",
			products,
			totalPrice: toUSD(rawTotal),
		});
	} catch (err) {
		console.log(err);
	}
};

export const addToCart = async (req: Request, res: Response) => {
	try {
		const { productId } = req.body;
		const cart = await req.user.getCart();

		const existingProducts = await cart.getProducts({
			where: { id: productId },
		});

		const product = existingProducts.length > 0 ? existingProducts[0] : null;

		if (product) {
			const { cartItem } = product;
			cartItem.quantity += 1;
			await cartItem.save();
		} else {
			const newProduct = await Product.findByPk(productId);
			if (!newProduct) return res.status(404).send("Product not found");
			await cart.addProduct(newProduct, { through: { quantity: 1 } });
		}

		res.redirect("/cart");
	} catch (err) {
		console.log(err);
	}
};

export const removeFromCart = async (req: Request, res: Response) => {
	try {
		const cart = await req.user.getCart();
		const { id } = req.body;

		const product = await cart.getProducts({ where: { id } });

		if (await product[0].cartItem) await product[0].cartItem.destroy();

		res.redirect("/cart");
	} catch (err) {
		console.log(err);
	}
};

export const renderOrders = (_: Request, res: Response) => {
	res.render("shop/orders", { pageTitle: "Orders" });
};

export const renderCheckout = (_: Request, res: Response) => {
	res.render("shop/checkout", { pageTitle: "Checkout" });
};
