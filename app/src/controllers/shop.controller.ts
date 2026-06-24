import type { Request, Response } from "express";
import { findById } from "../lib/utils.js";
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
	const products = await Product.fetchAll();

	const { productId } = req.body;
	const product = products.find((p) => findById(productId, p));

	if (!product) return res.status(404).send("Product not found");

	Cart.addToCart(product?.id, Number(product?.price));
	console.log(productId, product?.price);
	res.redirect("/cart");
};

export const renderOrders = (_: Request, res: Response) => {
	res.render("shop/orders", { pageTitle: "Orders" });
};

export const renderCheckout = (_: Request, res: Response) => {
	res.render("shop/checkout", { pageTitle: "Checkout" });
};
