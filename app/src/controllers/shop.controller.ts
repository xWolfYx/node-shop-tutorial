import type { Request, Response } from "express";
import type { CartData } from "../lib/types.js";
import { toUSD } from "../lib/utils.js";
import {
	addToCart as addItemToCart,
	fetchCart,
	removeFromCart as removeItemFromCart,
} from "../models/cart.js";
import Product from "../models/product.js";

export const renderIndex = async (_: Request, res: Response) => {
	try {
		const rawProducts = await Product.findAll();
		const products = rawProducts.map((p) => ({
			...p.toJSON(),
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

export const renderCart = async (req: Request, res: Response) => {
	try {
		const cart = await req.user.getCart();
		const rawProducts = await cart.getProducts();

		const products = rawProducts.map((p) => ({
			...p.toJSON(),
			price: toUSD(p.price),
		}));

		res.render("shop/cart", {
			pageTitle: "Cart",
			products,
			totalPrice: toUSD(cart.totalPrice),
		});
	} catch (err) {
		console.log(err);
	}

	// 	return {
	// 		...product,
	// 		quantity: cp.quantity ?? 0,
	// 		price: toUSD(product.price),
	// 	};
	// });

	// });
};

export const addToCart = async (req: Request, res: Response) => {
	try {
		const { productId } = req.body;
		const cart = await req.user.getCart();

		const existingProducts = await cart.getProducts({
			where: { id: productId },
		});

		let product = existingProducts.length > 0 ? existingProducts[0] : null;

		if (product) {
			const { cartItem } = product;
			cartItem.quantity += 1;
			await cartItem.save();
		} else {
			const newProduct = await Product.findByPk(productId);
			if (!newProduct) return res.status(404).send("Product not found");
			await cart.addProduct(newProduct, { through: { quantity: 1 } });
		}

		res.redirect("/cart");
	} catch (err) {
		console.log(err);
	}
};

export const removeFromCart = async (req: Request, res: Response) => {
	try {
		const products = await Product.fetchAll();
		const id = req.body.id;

		if (req.body.id) {
			const product = products.find((p) => p.id === id);

			if (!product) return res.redirect("/cart");

			await removeItemFromCart(id, product.price);
		}
		res.redirect("/cart");
	} catch (err) {
		console.log(err);
	}
};

export const renderOrders = (_: Request, res: Response) => {
	res.render("shop/orders", { pageTitle: "Orders" });
};

export const renderCheckout = (_: Request, res: Response) => {
	res.render("shop/checkout", { pageTitle: "Checkout" });
};
