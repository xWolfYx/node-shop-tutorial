import type { Request, Response } from "express";
import { Cart } from "../models/cart.js";
import { Product } from "../models/product.js";

export const renderIndex = async (_: Request, res: Response) => {
	res.render("shop/index", {
		pageTitle: "Shop",
	});
};

export const renderCart = (_: Request, res: Response) => {
	res.render("shop/cart", { pageTitle: "Cart" });
};

export const postCart = async (req: Request, res: Response) => {
	const cart = new Cart();
	const products = await Product.fetchAll();

	const { productId } = req.body;
	const product = products.find((p) => p.id === productId);

	if (!product) return res.status(404).send("Product not found");

	cart.addToCart(product?.id, Number(product?.price));
	res.redirect("/cart");
};

export const renderOrders = (_: Request, res: Response) => {
	res.render("shop/orders", { pageTitle: "Orders" });
};

export const renderCheckout = (_: Request, res: Response) => {
	res.render("shop/checkout", { pageTitle: "Checkout" });
};
