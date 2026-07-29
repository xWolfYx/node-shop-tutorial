import type { Request, Response } from "express";
import { toUSD } from "../lib/utils.js";
import Product from "../models/product.js";

export const renderIndex = async (_: Request, res: Response) => {
	try {
		const rawProducts = await Product.fetchAllProducts();
		const products = rawProducts.map((p) => ({
			...p,
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

export const renderCheckout = (_: Request, res: Response) => {
	res.render("shop/checkout", { pageTitle: "Checkout" });
};
