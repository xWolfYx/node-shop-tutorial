import type { Request, Response } from "express";
import { addToCart } from "../models/cart.js";
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

export const postCart = async (req: Request, res: Response) => {
	const products = await Product.fetchAll();

	const { productId } = req.body;
	const product = products.find((p) => p.id === productId);

	if (!product) return res.status(404).send("Product not found");

	addToCart(product.id, Number(product.price));
	res.redirect("/cart");
};

export const renderOrders = (_: Request, res: Response) => {
	res.render("shop/orders", { pageTitle: "Orders" });
};

export const renderCheckout = (_: Request, res: Response) => {
	res.render("shop/checkout", { pageTitle: "Checkout" });
};
