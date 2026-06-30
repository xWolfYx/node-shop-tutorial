import fs from "node:fs/promises";
import path from "node:path";
import type { CartData, CartProduct } from "../lib/types.js";
import { rootPath } from "../utils/path.js";

const cartFilePath = path.join(rootPath, "data", "cart.json");

export async function addToCart(id: string, productPrice: number) {
	let cart: CartData = { products: [], totalPrice: 0 };

	try {
		const cartItems = await fs.readFile(cartFilePath, "utf8");
		if (cartItems.trim()) cart = JSON.parse(cartItems);
	} catch (err) {
		console.log(err);
	}

	try {
		const existingProductIndex = cart.products.findIndex((p) => p.id === id);
		const existingProduct = cart.products[existingProductIndex];
		let updatedProduct: CartProduct;

		if (existingProduct) {
			updatedProduct = {
				...existingProduct,
				quantity: existingProduct.quantity + 1,
			};
			cart.products[existingProductIndex] = updatedProduct;
		} else {
			updatedProduct = { id, quantity: 1 };
			cart.products = [...cart.products, updatedProduct];
		}
		cart.totalPrice += productPrice;

		await fs.writeFile(cartFilePath, JSON.stringify(cart, null, 2));
	} catch (err) {
		console.log(err);
	}
}

export async function removeFromCart(id: string, productPrice: number) {
	try {
		const cartData = await fs.readFile(cartFilePath, "utf-8");
		const cart: CartData = cartData.trim()
			? JSON.parse(cartData)
			: { products: [], totalPrice: 0 };

		const product = cart.products.find((p) => p.id === id);
		if (!product) return;

		cart.totalPrice = cart.totalPrice - productPrice * product.quantity;
		cart.products = cart.products.filter((p) => p.id !== id);

		await fs.writeFile(cartFilePath, JSON.stringify(cart, null, 2));
	} catch (err) {
		console.log(err);
	}
}
