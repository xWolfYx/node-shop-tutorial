import fs from "node:fs/promises";
import path from "node:path";
import type { CartData, CartProduct, ICart } from "../lib/types.js";
import { rootPath } from "../utils/path.js";

const cartFilePath = path.join(rootPath, "data", "cart.json");

export class Cart implements ICart {
	async addToCart(id: string, productPrice: number) {
		try {
			const cartItems = await fs.readFile(cartFilePath, "utf-8");
			let cart: CartData = { products: [], totalPrice: 0 };

			if (!cartItems.trim()) cart = JSON.parse(cartItems);
			cart = JSON.parse(cartItems);

			const existingProductIndex = cart.products.findIndex((p) => p.id === id);
			const existingProduct = cart.products[existingProductIndex];
			let updatedProduct: CartProduct;

			if (existingProduct) {
				updatedProduct = {
					...existingProduct,
					quantity: existingProduct.quantity + 1,
				};
				cart.products = [...cart.products];
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
}
