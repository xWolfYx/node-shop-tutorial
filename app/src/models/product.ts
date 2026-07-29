import { ObjectId } from "mongodb";
import { getDB } from "../utils/db.js";

export default class Product {
	title: string;
	imageUrl: string;
	description: string;
	price: number;

	constructor(
		title: string,
		imageUrl: string,
		description: string,
		price: number,
	) {
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}

	async save() {
		const db = getDB();

		try {
			return await db.collection("products").insertOne(this);
		} catch (err) {
			console.log(err);
		}
	}

	static async fetchAllProducts() {
		const db = getDB();

		try {
			const result = await db.collection("products").find().toArray();
			return result;
		} catch (err) {
			console.log(err);
		}
	}

	static async fetchProduct(id: string) {
		if (!ObjectId.isValid(id)) return null;

		const db = getDB();

		try {
			const result = await db
				.collection("products")
				.findOne({ _id: new ObjectId(id) });
			return result;
		} catch (err) {
			console.log(err);
		}
	}

	static async deleteProduct(id: string) {
		if (!ObjectId.isValid(id)) {
			return;
		}

		try {
			const db = getDB();

			await db.collection("products").deleteOne({ _id: new ObjectId(id) });
		} catch (err) {
			console.log(err);
		}
	}
}
