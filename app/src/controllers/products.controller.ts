import { randomUUID } from "node:crypto";
import type { Request, Response } from "express";
import { findById, toCents, toUSD } from "../lib/utils.js";
import { Product } from "../models/product.js";

export const renderProducts = async (_: Request, res: Response) => {
	const rawProducts = await Product.fetchAll();
	const products = rawProducts.map((p) => ({ ...p, price: toUSD(p.price) }));
	res.render("shop/product-list", {
		products,
		pageTitle: "Products",
	});
};

export const renderProduct = async (req: Request, res: Response) => {
	const products = await Product.fetchAll();

	const product = products.find((p) => findById(req.params.id as string, p));
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
		const newProduct = new Product(
			id,
			title,
			imageUrl,
			description,
			toCents(price),
		);
		await newProduct.save();
	}
	res.redirect("/");
};
