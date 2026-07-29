import { randomUUID } from "node:crypto";
import type { Request, Response } from "express";
import { toUSD } from "../lib/utils.js";
import Product from "../models/product.js";

export const renderProducts = async (_: Request, res: Response) => {
	try {
		const rawProducts = await Product.findAll();
		const products = rawProducts.map((p) => ({
			...p.toJSON(),
			price: toUSD(p.price),
		}));

		res.render("shop/product-list", {
			products,
			pageTitle: "Products",
		});
	} catch (err) {
		console.log(err);
	}
};

export const renderProduct = async (req: Request, res: Response) => {
	const id = req.params.id as string;

	if (!id) return res.redirect("/");

	try {
		const rawProduct = await Product.fetchProduct(id);

		if (!rawProduct) return res.redirect("/");

		const product = { ...rawProduct, price: toUSD(rawProduct.price) };

		res.render("shop/product-details", {
			pageTitle: product.title,
			path: "/products",
			product,
		});
	} catch (err) {
		console.log(err);
		res.status(500).redirect("/");
	}
};

export const renderAddProducts = (_: Request, res: Response) => {
	res.render("admin/edit-product", {
		pageTitle: "Add Product",
		product: null,
		editing: false,
	});
};

export const renderAdminProducts = async (req: Request, res: Response) => {
	try {
		const rawProducts = await Product.fetchAllProducts();

		const products = rawProducts.map((p) => ({
			...p,
			price: toUSD(p.price),
		}));

		res.render("admin/product-list", {
			products,
			pageTitle: "Admin - Products",
		});
	} catch (err) {
		console.log(err);
	}
};

export const renderEditProducts = async (req: Request, res: Response) => {
	const isEdited = req.query.edit;
	const id = req.params.id as string;

	try {
		const rawProduct = await Product.findByPk(id);

		if (!rawProduct) return res.redirect("/");

		const product = {
			...rawProduct.toJSON(),
			price: rawProduct.price / 100,
		};

		res.render("admin/edit-product", {
			pageTitle: "Edit Product",
			editing: isEdited,
			product,
		});
	} catch (err) {
		console.log("Product doesn't exist or there is another error", err);
	}
};

export const addProduct = async (req: Request, res: Response) => {
	const { title, imageUrl, price, description } = req.body;
	if (title && imageUrl && price && description) {
		try {
			const product = new Product(title, imageUrl, description, price * 100);

			await product.save();
			res.redirect("/admin/products");
		} catch (err) {
			console.log(err);
			res.redirect("/admin/add-product");
		}
	}
};

export const editProduct = async (req: Request, res: Response) => {
	const { id, title, imageUrl, description, price } = req.body;

	await Product.update(
		{ title, imageUrl, description, price: price * 100 },
		{ where: { id } },
	);
	res.redirect("/admin/products");
};

export const deleteProduct = async (req: Request, res: Response) => {
	const { id } = req.body;

	if (!id) return;

	try {
		await Product.destroy({ where: { id } });

		res.redirect("/admin/products");
	} catch (err) {
		console.log(err);
	}
};
