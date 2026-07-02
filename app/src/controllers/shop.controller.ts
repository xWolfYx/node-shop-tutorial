import type { Request, Response } from "express";
import type { CartData } from "../lib/types.js";
import { toUSD } from "../lib/utils.js";
import {
	addToCart as addItemToCart,
	fetchCart,
	removeFromCart as removeItemFromCart,
} from "../models/cart.js";
import { Product } from "../models/product.js";

export const renderIndex = async (_: Request, res: Response) => {
	res.render("shop/index", {
		pageTitle: "Shop",
	});
};

export const renderCart = async (_: Request, res: Response) => {
	const cart: CartData = await fetchCart();
	const products = await Product.fetchAll();

	if (!cart.products) return null;

	const cartProducts = cart.products.map((cp) => {
		const product = products.find((p) => p.id === cp.id);

		if (!product) return null;

		return {
			...product,
			quantity: cp.quantity ?? 0,
			price: toUSD(product.price),
		};
	});

	res.render("shop/cart", {
		pageTitle: "Cart",
		products: cartProducts,
		totalPrice: toUSD(cart.totalPrice),
	});
};

export const addToCart = async (req: Request, res: Response) => {
	const products = await Product.fetchAll();

	const { productId } = req.body;
	const product = products.find((p) => p.id === productId);

	if (!product) return res.status(404).send("Product not found");

	addItemToCart(product.id, Number(product.price));
	res.redirect("/cart");
};

export const removeFromCart = async (req: Request, res: Response) => {
	try {
		const products = await Product.fetchAll();
		const id = req.body.id;

		if (req.body.id) {
			const product = products.find((p) => p.id === id);

			if (!product) return res.redirect("/cart");

			await removeItemFromCart(id, product.price);
		}
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
