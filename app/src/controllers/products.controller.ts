import { randomUUID } from "node:crypto";
import type { Request, Response } from "express";
import Product from "../models/product.js";

export const renderProducts = async (_: Request, res: Response) => {
	try {
		const rawProducts = await Product.findAll();
		const products = rawProducts.map((p) => ({
			...p.get({ plain: true }),
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
		const rawProduct = await Product.findByPk(id);

		if (!rawProduct) return res.redirect("/");

		const product = {
			...rawProduct.get({ plain: true }),
			price: toUSD(rawProduct.price),
		};
		console.log(product);

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

export const renderAdminProducts = async (_: Request, res: Response) => {
	try {
		const rawProducts = await Product.findAll();
		const products = rawProducts.map((p) => ({
			...p.get({ plain: true }),
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

		try {
			Product.create({ id, title, imageUrl, description, price });
		} catch (err) {
			console.log(err);
			return res.redirect("/admin/add-product");
		}
	}
	res.redirect("/");
};

export const editProduct = (req: Request, res: Response) => {
	const { id, title, imageUrl, description, price } = req.body;
	const updatedProduct = new Product(
		id,
		title,
		imageUrl,
		description,
		toCents(price),
	);

	updatedProduct.save();
	res.redirect("/admin/products");
};

export const deleteProduct = async (req: Request, res: Response) => {
	const { id } = req.body;
	const products = await Product.fetchAll();
	const product = products.find((p) => p.id === id);

	if (!product) return;

	Product.delete(id);
	await removeFromCart(id, product.price);

	res.redirect("/admin/products");
};
