import fs from "node:fs";
import path from "node:path";
import type { CartData, ICart } from "../lib/types.js";
import { rootPath } from "../utils/path.js";

const cartFilePath = path.join(rootPath, "data", "cart.json");

export class Cart implements ICart {
	addToCart(id: string, productPrice: number) {
		fs.readFile(cartFilePath, "utf-8", (err, cartItems) => {
			let cart: CartData = { products: [], totalPrice: 0 };

			if (!err && cartItems.trim()) {
				try {
					cart = JSON.parse(cartItems);
				} catch (err) {
					console.log(err);
				}
			}

			const existingProductIndex = cart.products.findIndex((p) => p.id === id);
			const existingProduct = cart.products[existingProductIndex];

			let updatedProduct;
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

			fs.writeFile(cartFilePath, JSON.stringify(cart, null, 2), (err) => {
				console.log(JSON.stringify(cart, null, 2));
				if (err) console.log(`Error in addToCart: ${err.message}`);
				console.log("Cart item added successfully");
			});
		});
	}
}
