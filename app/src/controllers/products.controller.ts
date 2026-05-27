import type { Request, Response } from "express";
import { Product } from "../models/product";

export const renderProducts = async (_: Request, res: Response) => {
	const products = await Product.fetchAll();

	res.render("shop", {
		products,
		pageTitle: "Shop",
	});
};

export const renderAddProducts = (_: Request, res: Response) => {
	res.render("add-product", {
		pageTitle: "Add Product",
	});
};

export const addProduct = async (req: Request, res: Response) => {
	if (req.body.title) {
		const product = new Product(req.body.title);
		await product.save();
	}
	res.redirect("/");
};
