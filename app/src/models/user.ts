import { getDB } from "../utils/db.js";

export default class User {
	userName: string;
	email: string;

	constructor(userName: string, email: string) {
		this.userName = userName;
		this.email = email;
	}

	async save() {
		const db = getDB();

		try {
			await db.collection("users").insertOne(this);
		} catch (err) {
			console.log(err);
		}
	}

}
