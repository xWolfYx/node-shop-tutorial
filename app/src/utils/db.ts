import mysql from "mysql2/promise";

const pool = mysql.createPool({
	host: "localhost",
	user: "root",
	database: "product-shop",
	password: "StrongPassword",
});

export default pool;
