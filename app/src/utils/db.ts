import { type Db, MongoClient } from "mongodb";

const { MONGO_URI } = process.env;

if (!MONGO_URI) {
	throw new Error("Please define the MONGO_URI environmental variable");
}

const client = new MongoClient(MONGO_URI);

let db: Db | null = null;

const connectDB = async (): Promise<Db> => {
	if (db) return db;

	try {
		await client.connect();
		console.log("Connected successfully to MongoDB");

		db = client.db("product-shop");
		return db;
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

const getDB = () => {
	if (!db) throw new Error("Database not initialized. Call connectDB first.");

	return db;
};

export { connectDB, getDB };
