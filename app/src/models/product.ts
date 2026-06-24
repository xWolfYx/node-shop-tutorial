import { randomUUID } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import type { ProductData } from "../lib/types.js";
import { rootPath } from "../utils/path.js";

const productFilePath = path.join(rootPath, "data", "products.json");

const getData = async (): Promise<ProductData[]> => {
	try {
		const data = await JSON.parse(await fs.readFile(productFilePath, "utf-8"));
		return data;
	} catch (err) {
		console.log(err);
		return [];
	}
};

export class Product implements ProductData {
	constructor(
		public id: string,
		public title: string,
		public imageUrl: string,
		public description: string,
		public price: number,
	) {}

	static async fetchAll(): Promise<ProductData[]> {
		try {
			return getData();
		} catch (err) {
			console.log(err);
			return [];
		}
	}

	async save(): Promise<void> {
		try {
			const products = await getData();

			this.id = randomUUID();
			const newProduct = {
				id: this.id,
				title: this.title,
				imageUrl: this.imageUrl,
				description: this.description,
				price: this.price,
			};

			products.push(newProduct);
			await fs.writeFile(productFilePath, JSON.stringify(products, null, 2));
		} catch (err) {
			console.log(err);
		}
	}
}
