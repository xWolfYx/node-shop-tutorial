import fs from "node:fs/promises";
import path from "node:path";
import { rootPath } from "../utils/path";

interface ProductData {
	title: string;
}

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
	constructor(public title: string) {
		this.title = title;
	}

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

			products.push({ title: this.title });
			await fs.writeFile(productFilePath, JSON.stringify(products, null, 2));
		} catch (err) {
			console.log(err);
		}
	}
}
