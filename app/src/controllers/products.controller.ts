import { randomUUID } from "node:crypto";
import type { Request, Response } from "express";
import { toCents, toUSD } from "../lib/utils.js";
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

	const product = products.find((p) => req.params.id === p.id);
	res.render("shop/product-details", {
		pageTitle: product?.title,
		path: "/products",
		product,
	});
};

export const renderAddProducts = (_: Request, res: Response) => {
	res.render("admin/edit-product", {
		pageTitle: "Add Product",
		product: null,
		editing: false,
	});
};

export const renderAdminProducts = async (_: Request, res: Response) => {
	const products = await Product.fetchAll();

	res.render("admin/product-list", {
		products,
		pageTitle: "Admin - Products",
	});
};

export const renderEditProducts = async (req: Request, res: Response) => {
	const isEdited = req.query.edit;

	const id = req.params.id;

	const products = await Product.fetchAll();
	const product = products.find((p) => p.id === id);

	res.render("admin/edit-product", {
		pageTitle: "Edit Product",
		editing: isEdited,
		product,
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
