import { randomUUID } from "node:crypto";
import type { Request, Response } from "express";
import { findById } from "../lib/utils";
import { Product } from "../models/product";

export const renderProducts = async (_: Request, res: Response) => {
	const products = await Product.fetchAll();

	res.render("shop/product-list", {
		products,
		pageTitle: "Products",
	});
};

export const renderProduct = async (req: Request, res: Response) => {
	const products = await Product.fetchAll();

	const product = products.find((p) => findById(req.params.id, p));
	res.render("shop/product-details", {
		pageTitle: product?.title,
		path: "/products",
		product,
	});
};

export const renderAddProducts = (_: Request, res: Response) => {
	res.render("admin/add-product", {
		pageTitle: "Add Product",
	});
};

export const renderAdminProducts = async (_: Request, res: Response) => {
	const products = await Product.fetchAll();

	res.render("admin/product-list", {
		products,
		pageTitle: "Admin - Products",
	});
};

export const addProduct = async (req: Request, res: Response) => {
	const { title, imageUrl, price, description } = req.body;
	if (title && imageUrl && price && description) {
		const id = randomUUID();
		const product = new Product(id, title, imageUrl, description, price);
		await product.save();
	}
	res.redirect("/");
};
